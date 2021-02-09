const { Pool } = require('pg');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}


module.exports = dbParams;


// const pool = new Pool(dbParams);



// const getUsersListings = function(userID) {
//   return pool.query(`
//   SELECT * FROM listings
//   WHERE seller_id = $1;
//   `, [userID])
//   .then(res => {
//     return res.rows;
//   })
//   .catch((error => {
//     console.log("Error message", error)
//   }));
// };


// const getFavouritesForUser = function(userID) {
//   return pool.query(`
//   SELECT * FROM favourites
//   WHERE user_id = $1;
//   `, [userID])
//   .then(res => {
//     return res.rows;
//   })
//   .catch((error => {
//     console.log("Error message", error)
//   }));
// };



// const createNewListing = function(listingObj) {
//   return pool.query(`
//   INSERT INTO listings (seller_id, title, description, price, author, condition, picture_url)
//   VALUES ($1, $2, $3, $4, $5, $6, $7)
//   RETURNING *;
//   `, [listingObj.seller_id, listingObj.title, listingObj.description, listingObj.price, listingObj.author, listingObj.condition, listingObj.picture_url])
//   .then(res => {
//     return res.rows[0];
//   })
//   .catch((error => {
//     console.log("Error message", error)
//   }));
// };


// const deleteListing = function(userID, listingID) {
//   return pool.query(`
//   DELETE FROM listings WHERE user_id = $1 AND id = $2;
//   `, [userID, listingID])
// };


// const markListingAsSold = function(listingID) {
//   return pool.query(`
//   UPDATE listings
//   SET isSold = TRUE
//   WHERE id = $1
//   `, [listingID])
// };


// // Needs work
// const favouriteAListing = function(userID, listingID) {
//   return pool.query(`
//   INSERT INTO favourites (user_id, listing_id)
//   VALUES ($1, $2);
//   `, [userID, listingID])
// };

// const isListingFavourited = function(userID, listingID) {
//   return new Promise((resolve) => {
//     pool.query(`SELECT EXISTS (SELECT 1 FROM favourites WHERE user_id = $1 AND listing_id = $2)`, [userID, listingID])
//     .then((res) => {
//       console.log("Unknown res: ", res);
//       if(res) {
//       resolve(true);
//     } else {
//       resolve(false);
//     }
//     })
//   })
// };




// //Search funtions
// const searchByMaxPrice = function(bookPrice, orderBy) {
//   const queryString = `SELECT * FROM listings WHERE price <= $1 ORDER BY $2`
//   const values = [bookPrice, orderBy]
//   pool.query(queryString, values)
//   .then(res => {
//     return res.rows;
//   })
//   .catch(err => console.error('query error', err.stack));
// };

// const searchByMinPrice = function(bookPrice, orderBy) {
//   const queryString = `SELECT * FROM listings WHERE price >= $1 ORDER BY $2 DESC`
//   const values = [bookPrice, orderBy]
//   pool.query(queryString, values)
//   .then(res => {
//     return res.rows;
//   })
//   .catch(err => console.error('query error', err.stack));
// };

// const searchByTitle = function(bookTitle) {
//   const queryString = `SELECT * FROM listings WHERE title LIKE $1`
//   const values = [bookTitle]
//   pool.query(queryString, values)
//   .then(res => {
//     return res.rows;
//   })
//   .catch(err => console.error('query error', err.stack));
// };

// const searchByAuthor = function(bookAuthor) {
//   const queryString = `SELECT * FROM listings WHERE author LIKE $1`
//   const values = [bookAuthor]
//   pool.query(queryString, values)
//   .then(res => {
//     return res.rows;
//   })
//   .catch(err => console.error('query error', err.stack));
// };

// const randomUserID = () => {
//   return Math.floor(Math.random() * 20) + 1;
// };



// module.exports = {
//   getFavouritesForUser,
//   getUsersListings,
//   createNewListing,
//   deleteListing,
//   markListingAsSold,
//   isListingFavourited,
//   searchByMaxPrice,
//   searchByMinPrice,
//   searchByTitle,
//   searchByAuthor,
//   randomUserID,
//   favouriteAListing
// };


