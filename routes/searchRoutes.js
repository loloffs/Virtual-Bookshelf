
  const express = require('express');
// const router  = express.Router();
const app = express();
const DBHELPER = require('../db/dbHelper');

module.exports = (pool) => {
  const db = DBHELPER(pool);

  app.get("/main/search", (req, res) => {
    const searchText = req.query.searchText; //name of the search text box
    const searchType = req.query.searchType;
    const searchOrder = req.query.searchOrder;
    //search type is name of drop down menu
    //Make sure the form method and form action in the html document match those on the search routes, i.e. GET and /main //make sure index form references minPrice, maxPrice, title, autor //form values within the options tag must match up with search routes //implement form validation on the front end, i.e. please enter a number
    if (searchOrder === "lowestPrice") { // change order to set price aescending as default
      let orderBy = "price";
    } else if (searchOrder === "highestPrice") {
      let orderBy = "price DESC";
    }
    if (searchType === "maxPrice") {
      if (isNaN(searchText)) {
        return res.status(400).send('Please enter a number.');
      } else {
        db.searchByMaxPrice(searchText, orderBy)
        .then((results) => (
          // res.render("/main", templateVars) //figure out how were going render results on front end
          console.log(results)
        ));
      };
    } else if (searchType === "title") {
        db.searchByTitle(searchText, orderBy)
        .then((results) => (
          console.log(results) //change this once we decide how to render on front end
        ));
     } else if (searchType === "author") {
       db.searchByAuthor(searchText, orderBy)
       .then((results) => (
         console.log(results)
       ));
     } else {
       //Display all listings
     };

//Render results and display them on page


  return app;

});

const searchByMaxPrice = function(bookPrice, orderBy) {
  const queryString = `SELECT * FROM listings WHERE price <= $1 ORDER BY $2`
  const values = [bookPrice, orderBy]
  pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};

const searchByMinPrice = function(bookPrice, orderBy) {
  const queryString = `SELECT * FROM listings WHERE price >= $1 ORDER BY $2 DESC`
  const values = [bookPrice, orderBy]
  pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};

const searchByTitle = function(bookTitle) {
  const queryString = `SELECT * FROM listings WHERE title LIKE $1`
  const values = [bookTitle]
  pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};

const searchByAuthor = function(bookAuthor) {
  const queryString = `SELECT * FROM listings WHERE author LIKE $1`
  const values = [bookAuthor]
  pool.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => console.error('query error', err.stack));
};




