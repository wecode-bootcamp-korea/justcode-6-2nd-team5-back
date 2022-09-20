-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: jejuzoa
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rentcarinfo`
--

DROP TABLE IF EXISTS `rentcarinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentcarinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carName` varchar(50) DEFAULT NULL,
  `carPhoto` varchar(100) DEFAULT NULL,
  `ridePeopleNumber` int DEFAULT NULL,
  `oilType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentcarinfo`
--

LOCK TABLES `rentcarinfo` WRITE;
/*!40000 ALTER TABLE `rentcarinfo` DISABLE KEYS */;
INSERT INTO `rentcarinfo` VALUES (1,'쏘나타 뉴 라이즈','https://static-file.jejupass.com/download/649853',5,'LPG'),(2,'모닝 어반','https://static-file.jejupass.com/download/651555',5,'휘발유'),(3,'SM3','https://static-file.jejupass.com/download/650997',5,'전기차'),(4,'엑센트','https://static-file.jejupass.com/download/117952',5,'휘발유'),(5,'올 뉴 아반떼CN7','https://static-file.jejupass.com/download/649942',5,'휘발유'),(6,'더 뉴 K5 2세대','https://static-file.jejupass.com/download/649780',5,'LPG'),(7,'벨로스터','https://static-file.jejupass.com/download/660422',5,'휘발유'),(8,'더 뉴 아반떼 AD','https://static-file.jejupass.com/download/1029347',5,'휘발유');
/*!40000 ALTER TABLE `rentcarinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-20 16:30:50
