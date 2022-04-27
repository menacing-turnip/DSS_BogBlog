CREATE DATABASE bogblogdb;

CREATE TABLE usertable (
   uid        uuid    DEFAULT   gen_random_uuid() PRIMARY KEY,
   username   VARCHAR (255) NOT NULL UNIQUE,
   email      VARCHAR (255) NOT NULL UNIQUE,
   password   VARCHAR (255) NOT NULL,
   profilePic TEXT,
   lastLogin  DATE
);

CREATE TABLE posts (
   pid          uuid    DEFAULT   gen_random_uuid() PRIMARY KEY,
   title        VARCHAR (255)     NOT NULL UNIQUE,
   description  TEXT              NOT NULL UNIQUE,
   photo        TEXT,
   username     VARCHAR (255)     NOT NULL,
   categories   VARCHAR (255) [],
   published_on DATE              NOT NULL,
   edited_on    DATE
);

CREATE TABLE category (
   cid         uuid    DEFAULT   gen_random_uuid() PRIMARY KEY,
   name        VARCHAR (255)     NOT NULL 
);

INSERT INTO category (name)
VALUES ('POLITICS');

INSERT INTO category (name)
VALUES ('RELIGION');

INSERT INTO category (name)
VALUES ('HEALTH');

INSERT INTO category (name)
VALUES ('TECHNOLOGY');

INSERT INTO category (name)
VALUES ('MOVIES');

INSERT INTO category (name)
VALUES ('TV SHOWS');

DROP DATABASE bogblogdb;
