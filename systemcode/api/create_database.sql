CREATE DATABASE bogblogdb;

CREATE TABLE usertable (
   uid        uuid    DEFAULT   gen_random_uuid() PRIMARY KEY,
   username   VARCHAR (255) NOT NULL,
   email      VARCHAR (255) NOT NULL,
   password   VARCHAR (255) NOT NULL,
   profilePic TEXT,
   lastLogin  DATE,
   UNIQUE (uid, username, email)
);

CREATE TABLE posts (
   pid          uuid    DEFAULT   gen_random_uuid() PRIMARY KEY,
   title        VARCHAR (255)     NOT NULL,
   description  TEXT              NOT NULL,
   photo        TEXT,
   username     VARCHAR (255)     NOT NULL,
   categories   VARCHAR (255) [],
   published_on DATE              NOT NULL,
   edited_on    DATE,
   UNIQUE (pid, title, description) 
);

CREATE TABLE category (
   cid         uuid    DEFAULT   gen_random_uuid() PRIMARY KEY,
   name        VARCHAR (255)     NOT NULL 
);

DROP DATABASE bogblogdb;