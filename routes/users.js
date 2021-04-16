/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
// const router  = express.Router();
const app = express();
const DBHELPER = require('../db/dbHelper');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

module.exports = (pool) => {
  const db = DBHELPER(pool);






// GET favourites for logged in user: done

app.get("/favourites", (req, res) => {
const userID = req.session.user_id;
  if (!userID) {
    return res.redirect("/main");
  }
  db.getFavouritesForUser(userID)
    .then((favourites) => {
      const templateVars = { favourites };
      res.render("favourites", templateVars);
    });
});


// POST create new listing: done

app.post("/login", (req, res) => {
  const userID = db.randomUserID();
  req.session.user_id = userID;
  res.send("Success",);
});


app.post("/create_listing", (req, res) => {
  const userID = req.session.user_id

  if(!userID) {
   return res.redirect("/main");
  }

  const newListing = req.body;

  newListing.seller_id = userID;

  db.createNewListing(newListing)
  .then(() => {
    db.getUsersListings(userID)
      .then((res1) => {
        let templateVars = { myListings: res1 };
        return res.render("myListings", templateVars);
      });

    });
});


// GET my_listings for logged in user: done

app.get("/myListings", (req, res) => {
  const userID = req.session.user_id;
  if (!userID) {
    return res.redirect("/main");
  }
  db.getUsersListings(userID)
    .then((myListings) => {
      const templateVars = { myListings };
      console.log(templateVars);
      res.render("myListings", templateVars);

    });
});


// POST 'favourite' a listing as a logged in user: Not sure how to do this

app.post("/:listing_id/favourite", (req, res) => {
  const userID = req.session.user_id
  const listingID = req.params.listing_id;

  if(!userID) {
   return res.redirect("/index");
  }

  db.isListingFavourited(userID, listingID)
  .then((result) => {

    console.log("RESULT: ", result);
    console.log("RESULT: ", result[0].exists);

    if (result[0].exists) {
      db.unfavourite(userID, listingID);
      console.log('unfavorited');
      return res.redirect("/api/users/favourites")
    }

    db.favouriteAListing(userID, listingID)
    .then(() => {
      console.log('favorited');
      return res.redirect("/api/users/favourites");
    });
  });
});




// Handle case for unfavourite


// DELETE delete your listing(s): Done

app.post("/my_listings/:listing_id/delete", (req, res) => {
  const userID = req.session.user_id;
  const listingID = req.params.listing_id;
  if (!userID) {
    res.redirect("/");
  }
  db.deleteListing(userID, listingID)
    .then(() => {
      res.redirect("/api/users/myListings");
    });
});


// PUT mark your listing as sold: Done

app.post("/my_listings/:listing_id/sold", (req, res) => {
  const userID = req.session.user_id
  const listingID = req.params.listing_id;

  // console.log("HEY!");
  // console.log("listingID", listingID);

  if(!userID) {
   return res.redirect("/");
  }

  db.markListingAsSold(listingID)
    .then(() => {
      res.redirect("/api/users/myListings");
    });

});



// GET/POST for login? figure out how to do this for "fake" login:


// First attempt...

// app.post("/login", (req, res) => {
//   const loginText = req.body.userID;

//   if (!loginText) {
//     return res.status(403).send("Please input a valid user ID");
//   }

//   req.session.user_id = loginText;
//   res.redirect("/main",);
// });


// Second attempt where clicking "Login" button logs in as a random user
app.post("/login", (req, res) => {
  const userID = db.randomUserID();
  req.session.user_id = userID;
  res.send("Success",);
});




// POST logout: which of these two is closest?: Done

app.post("/logout", (req, res) => {
  delete req.session.user_id;
  res.redirect("/main");
});

// router.post('/logout', (req, res) => {
//   req.session.userId = null;
//   res.send({});
// });



 // GET/POST for search feature?

  return app;

};



