# MySQL-Front 3.2  (Build 10.15)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;

/*!40101 SET NAMES latin1 */;
/*!40103 SET TIME_ZONE='SYSTEM' */;

DROP DATABASE IF EXISTS `grocerific`;
CREATE DATABASE `grocerific` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `grocerific`;
CREATE TABLE `aisles` (
  `id` int(11) NOT NULL auto_increment,
  `description` varchar(30) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `aisles` VALUES (1,'Dairy');
INSERT INTO `aisles` VALUES (2,'Frozen Foods');
INSERT INTO `aisles` VALUES (3,'Beverages');
INSERT INTO `aisles` VALUES (4,'Breakfast Foods');
INSERT INTO `aisles` VALUES (5,'Snacks, Cookies, & Candy');
INSERT INTO `aisles` VALUES (6,'Grains & Pastas');
INSERT INTO `aisles` VALUES (7,'Soups & Canned Goods');
INSERT INTO `aisles` VALUES (8,'Baking Goods');
INSERT INTO `aisles` VALUES (9,'Condiments');

CREATE TABLE `products` (
  `id` int(11) NOT NULL auto_increment,
  `description` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `price` float(5,2) unsigned NOT NULL default '0.00',
  `aisle_id` int(11) NOT NULL default '0',
  PRIMARY KEY  (`id`),
  KEY `aisle_id` (`aisle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `products` VALUES (1,'Coke Can','330ml',16,3);
INSERT INTO `products` VALUES (2,'Coke 8oz','237ml',8,3);
INSERT INTO `products` VALUES (3,'Coke 12oz','355ml',11,3);
INSERT INTO `products` VALUES (4,'Coke 500ml','500ml',13,3);
INSERT INTO `products` VALUES (5,'Pepsi Can','330ml',14,3);
INSERT INTO `products` VALUES (6,'Pepsi 8oz','237ml',6,3);
INSERT INTO `products` VALUES (7,'Pepsi 12oz','355ml',9,3);
INSERT INTO `products` VALUES (8,'Pepsi 500ml','500ml',11,3);
INSERT INTO `products` VALUES (9,'Virgin Cola Can','330ml',11,3);
INSERT INTO `products` VALUES (10,'Breakstone Butter Whipped Salted','8oz Tub',98,1);
INSERT INTO `products` VALUES (11,'Kraft Cheddar Cheese','8oz Bag',56,1);
INSERT INTO `products` VALUES (12,'Nestle Milk','1000ml',75,1);
INSERT INTO `products` VALUES (13,'Selecta Mocha Ice Cream','1 Pint',34,2);
INSERT INTO `products` VALUES (14,'Selecta Rocky Road Ice Cream','1 Pint',34,2);
INSERT INTO `products` VALUES (15,'Haagen Dazs Chocolate Ice Cream','1 Pint',68,2);
INSERT INTO `products` VALUES (16,'Gardenia Wheat Bread','24 oz Pkg',34,4);
INSERT INTO `products` VALUES (17,'Bisquick Pancake Mix','20oz Box',21.50,4);
INSERT INTO `products` VALUES (18,'Kelloggs Froot Loops Cereal','24oz Box',55.50,4);
INSERT INTO `products` VALUES (19,'Famous Amos Chocolate Chip Cookies','16oz PKG',125,5);
INSERT INTO `products` VALUES (20,'Oishi Hot and Spicy Potato Chips','4.5oz Bag',34,5);
INSERT INTO `products` VALUES (21,'Nestle Crunch 6-pack','750g',74.50,5);
INSERT INTO `products` VALUES (22,'Royal Spaghetti','16oz PKG',25,6);
INSERT INTO `products` VALUES (23,'Royal Macaroni','12oz Bag',16,6);
INSERT INTO `products` VALUES (24,'Spam Luncheon Meat','16oz Can',35,7);
INSERT INTO `products` VALUES (25,'Purefoods Corned Beef','12oz Can',46,7);
INSERT INTO `products` VALUES (26,'Hammer Baking Soda','16oz Pkg',21.50,8);
INSERT INTO `products` VALUES (27,'UFC Catsup','12oz',56,9);


ALTER TABLE `products`
  ADD FOREIGN KEY (`aisle_id`) REFERENCES `aisles` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
