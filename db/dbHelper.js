const { promiseImpl } = require("ejs");

module.exports = (pool) => {
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

  const getAllListings = function(user_id) {
    const listingsQuery = pool.query(`
    SELECT listings.*, users.email
    FROM listings
    JOIN users ON users.id = seller_id`)
    const favouritesQuery =  pool.query('SELECT * FROM favourites WHERE user_id = $1', [user_id])
    return Promise.all([listingsQuery, favouritesQuery])
    .then(res => {
      const listings = res[0].rows
      const favourites = res[1].rows
      for (const favourite of favourites) {
        const foundListing = listings.find( listing => {
        return listing.id === favourite.listing_id;
        })
        foundListing.isFavourite = true
      }
      console.log(listings)
      return listings;
    })
    .catch((error => {
      console.log("Error message", error)
    }));
  };

  const getFavouritesForUser = function(userID) {
    return pool.query(`
    SELECT * FROM listings
    JOIN favourites ON listing_id = listings.id
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
    INSERT INTO listings (title, description, price, author, condition, picture_url, seller_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `, [listingObj.title, listingObj.description, listingObj.price, listingObj.author, listingObj.condition, listingObj.picture_url, listingObj.seller_id])
    .then(res => {
      return res.rows[0];
    })
    .catch((error => {
      console.log("Error message", error)
    }));
  };


  const deleteListing = function(userID, listingID) {
    return pool.query(`
    DELETE FROM listings WHERE seller_id = $1 AND id = $2;
    `, [userID, listingID])
  };


  const markListingAsSold = function(listingID) {
    return pool.query(`
    UPDATE listings
    SET isSold = TRUE
    WHERE id = $1
    `, [listingID])
  };


  // Needs work...?
  const favouriteAListing = function(userID, listingID) {
    return pool.query(`
    INSERT INTO favourites (user_id, listing_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [userID, listingID])
  };

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

  const isListingFavourited = function(userID, listingID) {
    return pool.query(`
    SELECT EXISTS (SELECT 1 FROM favourites
    WHERE user_id = $1 AND listing_id = $2)`, [userID, listingID])
    .then(res => {
      return res.rows;
    }).catch(err => console.log(err));
}

  const unfavourite = function(userID, listingID) {
    return pool.query(`
    DELETE FROM favourites WHERE user_id = $1 AND listing_id = $2;
    `, [userID, listingID])
  };


  //Search funtions
  const searchByMaxPrice = function(bookPrice, orderBy) {
    let queryString = `SELECT * FROM listings WHERE price <= $1 ORDER BY `
    queryString += orderBy
    const values = [bookPrice]
    return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
  };

  const searchByMinPrice = function(bookPrice, orderBy) {
    let queryString = `SELECT * FROM listings WHERE price >= $1 ORDER BY `
    queryString += orderBy
    const values = [bookPrice]
    return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
  };

  const searchByTitle = function(bookTitle, orderBy) {
    let queryString = `SELECT * FROM listings WHERE title LIKE $1 ORDER BY `
    queryString += orderBy
    const values = [`%${bookTitle}%`]
    return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
  };

  const searchByAuthor = function(bookAuthor, orderBy) {
    let queryString = `SELECT * FROM listings WHERE author LIKE $1 ORDER BY `
    queryString += orderBy
    const values = [`%${bookAuthor}`]
    return pool.query(queryString, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => console.error('query error', err.stack));
  };

  const randomUserID = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  return {
    getFavouritesForUser,
    getUsersListings,
    createNewListing,
    deleteListing,
    markListingAsSold,
    isListingFavourited,
    searchByMaxPrice,
    searchByMinPrice,
    searchByTitle,
    searchByAuthor,
    randomUserID,
    favouriteAListing,
    getAllListings,
    unfavourite
  };

}

