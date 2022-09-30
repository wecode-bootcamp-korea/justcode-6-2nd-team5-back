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
-- Table structure for table `lodgmentreview`
--

DROP TABLE IF EXISTS `lodgmentreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lodgmentreview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `lodgmentId` int NOT NULL,
  `review` varchar(200) DEFAULT NULL,
  `cleanPoint` double NOT NULL,
  `facilityPoint` double NOT NULL,
  `servicePoint` double NOT NULL,
  `costperformancePoint` double NOT NULL,
  `reviewPoint` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lodgmentreview`
--

LOCK TABLES `lodgmentreview` WRITE;
/*!40000 ALTER TABLE `lodgmentreview` DISABLE KEYS */;
INSERT INTO `lodgmentreview` VALUES (1,1,'photo',1,'조아용',4,4,4,4,4,'2022-09-21 02:18:27'),(2,2,'null',1,'안조아용',1,1,1,1,1,'2022-09-21 02:18:27'),(3,2,'photo',1,'몰루용',3,3,3,3,3,'2022-09-21 08:15:02'),(8,2,'null',1,'사진없우용',4,2,1,3,2.5,'2022-09-21 08:19:34'),(9,2,'null',1,'사진읎우용',1,1,1,3,1.5,'2022-09-21 08:20:23');
/*!40000 ALTER TABLE `lodgmentreview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-30 10:19:52
