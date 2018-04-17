-- database
CREATE DATABASE IF NOT EXISTS `fleamaster`;

-- user table
CREATE TABLE IF NOT EXISTS `user` (
    'userid' smallint auto_increment primary key,
    'firstname' varchar(30),
    'lastname' varchar(30),
    'country' varchar(50),
    'city' varchar(50),
    'zip' varchar(10),
    'street' varchar(80),
    `mail` VARCHAR(100) NOT NULL,
    `pwd_hash` VARCHAR(255) NOT NULL
);
