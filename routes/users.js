/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const app = express();

const db = require('../lib/db');

// app.get('/login/:id', (req, res) => {
//   req.session.user_id = req.params.id;
//   res.redirect('/');
// });


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};



// GET main page

app.get("/", (req, res) => {

  res.redirect("/main");
});


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

app.get("/my_listings", (req, res) => {
  const userID = req.session.user_id;
  if (!userID) {
    return res.redirect("/main");
  }
  db.getUsersListings(userID)
    .then((myListings) => {
      const templateVars = { myListings };
      res.render("my_listings", templateVars);
    });
});


// POST 'favourite' a listing as a logged in user



// DELETE delete your listing(s): done?

app.post("/urls/:shortURL/delete", (req, res) => {
  const userID = req.session.user_id;
  if (!userID) {
    res.redirect("/main");
  }
  const removeListing =  db.deleteListing(userID);
  const templateVars = { removeListing };
  res.render("/my_listings", templateVars);
});


// PUT mark your listing as sold


// GET/POST for login? figure out how to do this for "fake" login


// POST logout: which of these two is closest?

app.post("/logout", (req, res) => {
  delete req.session.user_id;
  res.redirect("/main");
});

router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.send({});
});



// GET/POST for search feature?

