DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image TEXT DEFAULT 'https://www.artifacting.com/blog/wp-content/uploads/2010/11/Spiderman-150x126.png',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);