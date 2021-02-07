DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS favourites CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL
  -- updated_at DATE NOT NULL, -- optional
  -- created_at DATE NOT NULL, -- optional
  -- password VARCHAR(255) NOT NULL -- Do we even need a password?
);


-- CREATE TYPE condition_option as enum('Like new', 'Good', 'Average', 'Used');

CREATE TABLE listings (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price FLOAT  NOT NULL DEFAULT 0,
  author VARCHAR(100) NOT NULL,
  condition VARCHAR(100) NOT NULL, -- consider: ENUM ('new', 'used', 'lightly used') Ask mentor if I did this right
  picture_url VARCHAR(255),
  isSold BOOLEAN NOT NULL DEFAULT FALSE
  -- updated_at DATE NOT NULL,
  -- created_at DATE NOT NULL
);

CREATE TABLE favourites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE
  -- created_at DATE NOT NULL
);
