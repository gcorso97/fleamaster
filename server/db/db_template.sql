-- database
CREATE DATABASE IF NOT EXISTS `fleamaster`;

-- user table
CREATE TABLE IF NOT EXISTS `user` (
    'userid' smallint auto_increment primary key,
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
  'userid' smallint,
  'articleid' smallint,
  'totalprice' float,
  foreign key userid references user(userid),
  foreign key articleid references article(articleid),
  primary key (userid,articleid),
);

Create table 'article'(
  'articleid' smallint primary key,
  'provider' smallint,
  'articlename' varchar(50),
  'description' varchar(255),
  'categoryid' smallint,
  'price' float,
  foreign key categoryid references article(categoryid),
  foreign key provider references user(userid)
);

CREATE table 'category'(
  'categoryid' smallint primary key,
  'categoryname' varchar(255)
);
