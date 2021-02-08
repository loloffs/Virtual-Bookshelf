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



const createNewListing = function(listingObj) {
  return pool.query(`
  INSERT INTO listings (seller_id, title, description, price, author, condition, picture_url)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *;
  `, [listingObj.seller_id, listingObj.title, listingObj.description, listingObj.price, listingObj.author, listingObj.condition, listingObj.picture_url])
  .then(res => {
    return res.rows[0];
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};


const deleteListing = function(userID, listingID) {
  return pool.query(`
  DELETE FROM listings WHERE user_id = $1 AND id = $2;
  `, [userID, listingID])
};


const markListingAsSold = function(listingID) {
  return pool.query(`
  UPDATE listings
  SET isSold = TRUE
  WHERE id = $1
  `, [listingID])
};


// Needs work
const favouriteAListing = function(listing_id) {
  return pool.query(`
  UPDATE favourites
  SET user_id = user_id AND
  SET listing_id = listing_id
  WHERE listing.id = :id
  `, [listing_id])
  .then(res => {
    return res.rows;
  })
  .catch((error => {
    console.log("Error message", error)
  }));
};


// Needs work: Do I even need this function?

// const login =  function(userID) {

//   if (!userID === pool.query(`SELECT id FROMM users WHERE id = $1`)) {
//     console.log("Incorrect userID")
//   }

//   return pool.query(`
//     SELECT id FROMM users WHERE id = $1
//   `)
//   .then(user => {
//     if (bcrypt.compareSync(password, user.password)) {
//       return user;
//     }
//     return null;
//   });

// }


module.exports = {
  getFavouritesForUser,
  getUsersListings,
  createNewListing,
  deleteListing,
  markListingAsSold
};
