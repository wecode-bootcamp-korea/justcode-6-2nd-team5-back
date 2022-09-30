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
-- Table structure for table `restaurantreview`
--

DROP TABLE IF EXISTS `restaurantreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantreview` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `restaurantId` int NOT NULL,
  `review` varchar(500) DEFAULT NULL,
  `tastePoint` double NOT NULL,
  `servicePoint` double NOT NULL,
  `moodPoint` double NOT NULL,
  `reviewPoint` double NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantreview`
--

LOCK TABLES `restaurantreview` WRITE;
/*!40000 ALTER TABLE `restaurantreview` DISABLE KEYS */;
INSERT INTO `restaurantreview` VALUES (5,2,1,'제주시러!!!',4,3,1,2.6666666666666665,'2022-09-28 07:27:12','null'),(6,2,1,'제주시러2',4,3,1,2.6666666666666665,'2022-09-28 07:28:37','null'),(7,2,1,'제주시러2',4,3,1,2.6666666666666665,'2022-09-28 07:29:40','null'),(8,2,1,'제주시러2',4,3,1,2.6666666666666665,'2022-09-28 07:30:42','null'),(9,2,1,'제주시러2',4,3,1,2.6666666666666665,'2022-09-28 07:31:44','null'),(10,8,2,'맛 괜찮네요',3,2,3,2.6666666666666665,'2022-09-29 12:32:16','photo'),(11,8,2,'맛 괜찮네요',3,2,3,2.6666666666666665,'2022-09-29 13:47:17','photo'),(12,8,2,'맛 괜찮네요',3,2,3,2.6666666666666665,'2022-09-29 13:57:36','photo'),(13,8,1,'리뷰',3,5,4,4,'2022-09-29 13:59:39','null'),(14,8,1,'리뷰',3,5,4,4,'2022-09-29 14:01:57','null'),(15,8,1,'리뷰',3,5,4,4,'2022-09-29 14:04:29','null'),(16,8,1,'리뷰',3,5,4,4,'2022-09-29 14:05:49','null'),(17,8,1,'리뷰',3,5,4,4,'2022-09-29 14:35:25','null'),(18,8,1,'생성',3,5,4,4,'2022-09-29 14:37:39','null'),(19,8,1,'dfsdf',3,5,4,4,'2022-09-29 14:41:24','null'),(20,8,1,'',3,5,4,4,'2022-09-29 14:43:10','null'),(21,8,1,'dfsfd',3,5,4,4,'2022-09-29 14:43:34','null'),(22,8,2,'맛 괜찮네요',3,2,3,2.6666666666666665,'2022-09-30 00:26:08','photo'),(23,8,2,'맛 괜찮네요',3,2,3,2.6666666666666665,'2022-09-30 01:15:08','photo');
/*!40000 ALTER TABLE `restaurantreview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-30 10:19:53
