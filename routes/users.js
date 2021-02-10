/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const app = express();
const DBHELPER = require('../db/dbHelper');

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

app.post("/create_listing", (req, res) => {
  const userID = req.session.user_id

  if(!userID) {
   return res.redirect("/main");
  }

  const newListing = req.body;
  newListing.seller_id = userID;

  db.createNewListing(newListing)
    .then((newlyCreatedListing) => {
      res.json(newlyCreatedListing);
    });
});


// GET my_listings for logged in user: done

app.get("/myListings", (req, res) => {
  const userID = req.session.user_id;
  if (!userID) {
    return res.redirect("/index");
  }
  db.getUsersListings(userID)
    .then((myListings) => {
      const templateVars = { myListings };
      res.render("myListings", templateVars);
    });
});


// POST 'favourite' a listing as a logged in user: Not sure how to do this

app.post("/listings/:listing_id/favourite", (req, res) => {
  const userID = req.session.user_id
  const listingID = req.params.listing_id;

  if(!userID) {
   return res.redirect("/main");
  }

  db.isListingFavourited(userID, listingID)
    .then((isFavourited) => {
      if(isFavourited) {
        return res.status(403).send("Listing already favourited");
      } else {
        db.favouriteAListing(userID, listingID)
          .then((favourite) => {
            res.json(favourite);
        });
      }
    })
});




// Handle case for unfavourite


// DELETE delete your listing(s): Done

app.post("/main/my_listings/:listing_id/delete", (req, res) => {
  const userID = req.session.user_id;
  const listingID = req.params.listing_id;
  if (!userID) {
    res.redirect("/main");
  }
  db.deleteListing(userID, listingID)
    .then(() => {
      res.redirect("/my_listings");
    });
});


// PUT mark your listing as sold: Done

app.post("/my_listings/:listing_id/sold", (req, res) => {
  const userID = req.session.user_id
  const listingID = req.params.listing_id;

  if(!userID) {
   return res.redirect("/main");
  }

  db.markListingAsSold(listingID)
    .then(() => {
      res.send("Sold");
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
  console.log(userID);
  req.session.user_id = userID;
  res.send("Sucess",);
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



