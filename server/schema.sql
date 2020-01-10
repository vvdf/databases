CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  body TEXT,
  time_created DATETIME,
  user_id INTEGER,
  room_id INTEGER
);

CREATE TABLE users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name TEXT
);

CREATE TABLE rooms (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name TEXT
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

