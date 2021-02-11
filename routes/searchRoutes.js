
const express = require('express');
// const router  = express.Router();
const app = express();
const DBHELPER = require('../db/dbHelper');

module.exports = (pool) => {
  const db = DBHELPER(pool);

  app.get("/main/search", (req, res) => {
    const searchText = req.query.searchText; //name of the search text box
    const searchType = req.query.searchType;
    const searchOrder = req.query.searchOrder; //search type is name of drop down menu

    //Make sure the form method and form action in the html document match those on the search routes, i.e. GET and /main //make sure index form references minPrice, maxPrice, title, autor //form values within the options tag must match up with search routes //implement form validation on the front end, i.e. please enter a number


    //Make a second drop down for order by (form drop down box)?


    //We should have two optional drop down menu's (form data drop down menu's as linked in discord chat) for the search type and the order in the same form to get the query paramaters working
    let orderBy = "price";

    if (searchOrder === "highestPrice") {
      orderBy = "price DESC";
    }
    if (searchType === "maxPrice") {
      if (isNaN(searchText)) {
        return res.status(400).send('Please enter a number.');
      } else {
        db.searchByMaxPrice(searchText, orderBy)
        .then((results) => {
          const templateVars = { books: results};
          res.render("index", templateVars);
        });
      }
    } else if (searchType === "minPrice") {
      if (isNaN(searchText)) {
        return res.status(400).send('Please enter a number.');
      } else {
        db.searchByMinPrice(searchText, orderBy)
        .then((results) => {
          const templateVars = { books: results };
          res.render("index", templateVars);
        });
      }
    } else if (searchType === "title") {
      db.searchByTitle(searchText, orderBy)
      .then((results) => {
        console.log(results);
        const templateVars = { books: results };
        res.render("index", templateVars);
      });
     } else if (searchType === "author") {
       db.searchByAuthor(searchText, orderBy)
       .then((results) => {
        const templateVars = { books: results };
        res.render("index", templateVars);
       });
     } else {
        db.getAllListings()
          .then(rows => {
            const templateVars = { books: rows };
            console.log(req.query);
            res.render("index", templateVars);
          })
     };
  })
  return app;
};










