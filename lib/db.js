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

const pool = new Pool(dbParams);



const getUsersListings = function(userID) {
  return pool.query(`
  SELECT * FROM listings
  WHERE seller_id = $1;
  `, [userID])
  .then(res => {
    return res.rows;
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};


const getFavouritesForUser = function(userID) {
  return pool.query(`
  SELECT * FROM favourites
  WHERE user_id = $1;
  `, [userID])
  .then(res => {
    return res.rows;
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};



const createNewListing = function(/* not sure what to put here */) {
  return pool.query(`
  INSERT INTO listings (seller_id, title, description, price, author, condition, picture_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [/* not sure what to put here */])
  .then(res => {
    return res.rows[0][1][2][3][4][5][6][7];
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};


const deleteListing = function(userID) {
  return pool.query(`
  DELETE FROM listings WHERE user_id = $1;
  `, [userID])
  .then(res => {
    return res.rows;
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};



modules.export = { getFavouritesForUser, getUsersListings, createNewListing, deleteListing };
