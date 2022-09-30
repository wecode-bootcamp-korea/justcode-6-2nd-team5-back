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
-- Table structure for table `lodgment`
--

DROP TABLE IF EXISTS `lodgment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lodgment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `intro` varchar(500) DEFAULT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `useInfo` varchar(200) DEFAULT NULL,
  `reviewPoint` double DEFAULT NULL,
  `reviewCount` int DEFAULT NULL,
  `totalLike` int DEFAULT NULL,
  `starPoint` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lodgment`
--

LOCK TABLES `lodgment` WRITE;
/*!40000 ALTER TABLE `lodgment` DISABLE KEYS */;
INSERT INTO `lodgment` VALUES (1,'씨 스테이','해외 휴양지를 연상시키는 감각적인 인테리어','010-1111-2222','',0,NULL,NULL,4),(2,'민 조아트','아늑하고 여유롭게 제주의 바람을 느끼는 공간','010-2222-3333','',0,NULL,NULL,0),(3,'던모호','휴양지의 느낌과 모던한 매력이 담긴 숙소','010-3333-4444','',0,NULL,NULL,0),(4,'스타라이트','제주의 햇살과 별빛을 즐길 수 있는 곳','010-5555-6666','',0,NULL,NULL,5),(5,'동화이야기','가족단위 고객에게 안성맞춤인 숙소','010-6666-7777','',0,NULL,NULL,0),(6,'순하골','작은 시골에 온듯한 기분을 느낄 수 있는 곳','010-7777-8888','',0,NULL,NULL,0);
/*!40000 ALTER TABLE `lodgment` ENABLE KEYS */;
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
