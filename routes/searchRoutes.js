

  const express = require('express');
// const router  = express.Router();
const app = express();
const DBHELPER = require('../db/dbHelper');

module.exports = (pool) => {
  const db = DBHELPER(pool);

  app.get("/listings/min", (req, res) => {
    const userID = req.session.user_id;
      if (!userID) {
        return res.redirect("/main");
      }
      db.getFavouritesForUser(userID)
        .then((favourites) => {
          const templateVars = { favourites };
          res.json("favourites", templateVars); //pass in json data, add data to existing page
        });
    });



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



  return app;

};




