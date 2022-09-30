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
-- Table structure for table `restaurantmenu`
--

DROP TABLE IF EXISTS `restaurantmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantmenu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurantId` int NOT NULL,
  `menu` varchar(50) DEFAULT NULL,
  `price` int NOT NULL,
  `photo` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantmenu`
--

LOCK TABLES `restaurantmenu` WRITE;
/*!40000 ALTER TABLE `restaurantmenu` DISABLE KEYS */;
INSERT INTO `restaurantmenu` VALUES (1,1,'제주흑돼지오겹살',20000,NULL),(2,1,'제주흑돼지목살',20000,NULL),(3,1,'제주목살',16000,NULL),(4,1,'제주오겹살',16000,NULL),(5,1,'된장찌개',6000,NULL),(6,1,'김치찌개',6000,NULL),(7,1,'물냉면',8000,NULL),(8,1,'비빔냉면',8000,NULL),(9,2,'갈치조림',15000,NULL),(10,2,'물회',15000,NULL),(11,2,'해물뚝배기',10000,NULL),(12,2,'성게비빔밥',10000,NULL),(13,2,'성게라면',8000,NULL),(14,2,'성게미역국',14000,NULL),(15,3,'제주산 은갈치통구이',55000,NULL),(16,3,'제주산 은갈치조림',55000,NULL),(17,3,'옥돔구이',60000,NULL),(18,3,'모듬생선구이(중)',40000,NULL),(19,3,'모듬물회',15000,NULL),(20,4,'딱새우회',30000,NULL),(21,4,'우럭매운탕',50000,NULL),(22,4,'회모둠(대)',80000,NULL),(23,4,'해산물모둠',60000,NULL),(24,4,'초밥(대)',30000,NULL),(25,4,'우동',8000,NULL),(26,5,'마루나돈카츠',12000,NULL),(27,5,'황게 크림파스타',15000,NULL),(28,5,'딱새우장 정식',15000,NULL),(29,5,'고구마치즈고로케',5000,NULL),(30,5,'까르보나라',11000,NULL),(31,6,'흑돼지 해물라면',13000,NULL),(32,6,'전복 흑돼지 돈까스',13000,NULL),(33,6,'해물떡볶이',24000,NULL),(34,6,'전복 비빔국수',8000,NULL),(35,7,'통새우불고기볶음밥',7000,NULL),(36,7,'육식주의자피자',19000,NULL),(37,7,'스노우화이트피자',21000,NULL),(38,7,'토마토파스타',14000,NULL),(39,8,'리얼딸기라떼',6000,NULL),(40,8,'리얼딸기에이드',6000,NULL),(41,8,'아메리카노',3500,NULL),(42,8,'티라미수',6000,NULL),(43,9,'수제돈까스',10000,NULL),(44,9,'망고샐러드',8000,NULL),(45,9,'수제치즈돈까스',12000,NULL),(46,9,'까르보나라',12000,NULL),(47,9,'치즈볼',4000,NULL),(48,10,'메밀 물 막국수',7500,NULL),(49,10,'메밀 비빔 막국수',7500,NULL),(50,10,'메밀 온 국수',7500,NULL),(51,10,'등갈비 김치찌개',7500,NULL),(52,11,'대광어초밥',15000,NULL),(53,11,'회덮밥',10000,NULL),(54,11,'전복볶음밥',13000,NULL),(55,11,'광어가스',10000,NULL),(56,12,'아메리카노',4000,NULL),(57,12,'초콜릿라떼',4500,NULL),(58,12,'치즈식빵',4500,NULL),(59,12,'바닐랄라떼',5000,NULL);
/*!40000 ALTER TABLE `restaurantmenu` ENABLE KEYS */;
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
