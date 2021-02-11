
const express = require('express');
const app = express();
const DBHELPER = require('../db/dbHelper');

module.exports = (pool) => {
  const db = DBHELPER(pool);

  app.get("/main/search", (req, res) => {
    const searchText = req.query.searchText;
    const searchType = req.query.searchType;
    const searchOrder = req.query.searchOrder;

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

//Ideas:
    //Integrate the front end to take mutliple search params
    //Have w drop down menu's, one for search type and one for order by










