-- database
CREATE DATABASE IF NOT EXISTS `fleamaster`;

-- user table
CREATE TABLE IF NOT EXISTS `user` (
    'userid' int auto_increment primary key,
    'firstname' varchar(30),
    'lastname' varchar(30),
    'gender' varchar(4),
    'city' varchar(50),
    'zip' varchar(10),
    'street' varchar(80),
    `mail` VARCHAR(100) NOT NULL,
    `pwd_hash` VARCHAR(255) NOT NULL
);

Create table 'shoppingCart'(
  'userid' int,
  'articleid' int,
  'totalprice' float,
  foreign key userid references user(userid),
  foreign key articleid references article(articleid),
  primary key (userid,articleid),
);

Create table 'article'(
  'articleid' int primary key,
  'provider' int,
  'articlename' varchar(50),
  'description' varchar(255),
  'categoryid' int,
  'price' float,
  foreign key categoryid references article(categoryid),
  foreign key provider references user(userid)
);

CREATE table 'category'(
  'categoryid' int primary key,
  'categoryname' varchar(255)
);
