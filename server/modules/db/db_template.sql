-- database
DROP DATABASE IF EXISTS `fleamaster`;
CREATE DATABASE `fleamaster`;

USE `fleamaster`;

-- user table
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstname` VARCHAR(30),
    `lastname` VARCHAR(30),
    `city` VARCHAR(50),
    `zipcode` VARCHAR(10),
    `street` VARCHAR(80),
    `mail` VARCHAR(100) NOT NULL,
    `pwd_hash` VARCHAR(255) NOT NULL
);

-- category table
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

-- article table
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `category` INT NOT NULL,
  `price` FLOAT NOT NULL,
  `buyer` INT DEFAULT NULL,
  FOREIGN KEY (`category`) REFERENCES `category`(`id`),
  FOREIGN KEY (`user`) REFERENCES `user`(`id`),
  FOREIGN KEY (`buyer`) REFERENCES `user`(`id`)
);
