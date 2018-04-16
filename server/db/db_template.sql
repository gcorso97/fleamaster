-- database
CREATE DATABASE IF NOT EXISTS `fleamaster`;

-- user table
CREATE TABLE IF NOT EXISTS `user` (
    `mail` VARCHAR(100) NOT NULL PRIMARY KEY,
    `pwd_hash` VARCHAR(255) NOT NULL
);