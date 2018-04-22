-- database
CREATE DATABASE IF NOT EXISTS `fleamaster`;

-- user table
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstname` VARCHAR(30),
    `lastname` VARCHAR(30),
    `gender` VARCHAR(4),
    `city` VARCHAR(50),
    `zipcode` VARCHAR(10),
    `street` VARCHAR(80),
    `mail` VARCHAR(100) NOT NULL,
    `pwd_hash` VARCHAR(255) NOT NULL
);

-- category table
CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

-- article table
CREATE TABLE IF NOT EXISTS `article` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `category` INT NOT NULL,
  `price` FLOAT NULL NULL,
  FOREIGN KEY (`category`) REFERENCES `category`(`id`),
  FOREIGN KEY (`user`) REFERENCES `user`(`id`)
);
