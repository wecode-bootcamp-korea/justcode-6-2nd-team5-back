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
-- Table structure for table `restaurantaddress`
--

DROP TABLE IF EXISTS `restaurantaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurantaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurantId` int NOT NULL,
  `regionAddress` varchar(200) DEFAULT NULL,
  `fullAddress` varchar(500) DEFAULT NULL,
  `googleAddress` varchar(700) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurantaddress`
--

LOCK TABLES `restaurantaddress` WRITE;
/*!40000 ALTER TABLE `restaurantaddress` DISABLE KEYS */;
INSERT INTO `restaurantaddress` VALUES (1,1,'서귀포·중문','제주특별자치도 서귀포시 칠십리로 47','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.982816537349!2d126.55969871519392!3d33.24075358083454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350c53a16db7fed5%3A0xe45d09e15abff17!2s47%20Chilsimni-ro%2C%20Seogwipo%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1664372833907!5m2!1sen!2skr%22'),(2,2,'성산·섭지코지','제주특별자치도 서귀포시 성산읍 일출로 272-1','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.5110402229725!2d126.93228515045239!3d33.46204335595406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d14be430f2beb%3A0xfb84bbe17cfb7248!2s272%20Ilchul-ro%2C%20Seongsan-eup%2C%20Seogwipo%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1664377523633!5m2!1sen!2skr'),(3,3,'제주시내','제주특별자치도 제주시 어영길 10-6','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.325317943687!2d126.49122185045387!3d33.518926552999055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350cfb332121de15%3A0xd65d7e23ce32c35e!2s10-6%20Eoyeong-gil%2C%20Cheju%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1664377948383!5m2!1sen!2skr'),(4,4,'조천·함덕','제주특별자치도 제주시 조천읍 함덕13길 7 훈남횟집','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.4345308699167!2d126.66573525045445!3d33.54208475179476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d1f7cf2099f89%3A0x82641401bbbf3260!2z7ZWo642V66eb7KeRIO2biOuCqO2an-ynkQ!5e0!3m2!1sen!2skr!4v1664375665974!5m2!1sen!2skr'),(5,5,'한경·저지','제주특별자치도 제주시 한경면 금등4길 11 마루나키친','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.3498640196062!2d126.19369995044983!3d33.36193096114438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350c67fcfec3f931%3A0x4f3e5a032a932a15!2z66eI66Oo64KY7YKk7Lmc!5e0!3m2!1sen!2skr!4v1664378598352!5m2!1sen!2skr'),(6,6,'애월','제주특별자치도 제주시 애월읍 애월로 29 맛의고수','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6657.06153243579!2d126.30384135390625!3d33.461529600000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350cf5ac768db36b%3A0xecf55856b5449f5a!2z66eb7J2Y6rOg7IiY!5e0!3m2!1sen!2skr!4v1664378881585!5m2!1sen!2skr'),(7,7,'안덕·대정','제주특별자치도 서귀포시 안덕면 동광로 151 꽃썸피자','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.3537363049454!2d126.33788195044849!3d33.30956646385381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350c5837cb6790c1%3A0x2c0aafd0770db5f8!2sFlowersome%20Pizza!5e0!3m2!1sen!2skr!4v1664442547641!5m2!1sen!2skr'),(8,8,'성산·섭지코지','제주특별자치도 서귀포시 성산읍 삼달신풍로 132','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3331.900364011867!2d126.84240795045017!3d33.37366716053668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d0e42456a01ab%3A0x2029da8a608a6d94!2s132-7%20Samdalsinpung-ro%2C%20Seongsan-eup%2C%20Seogwipo%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1664442969269!5m2!1sen!2skr'),(9,9,'한림·협재','제주특별자치도 제주시 한림읍 귀덕14길 57-2 오크라','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.40316409826!2d126.29403315045178!3d33.438801357160216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350cf57ad74692bf%3A0xde1261155c6f9192!2sOkra!5e0!3m2!1sen!2skr!4v1664443317990!5m2!1sen!2skr'),(10,10,'조천·함덕','제주시 조천읍 중산간동로 478','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106465.82535599911!2d126.60795181098025!3d33.49989300147986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d1c61380cf8c5%3A0xcc7b7a09699dd21!2sJungsangandong-ro%2C%20Jochon-eup%2C%20Cheju%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1664443777518!5m2!1sen!2skr'),(11,11,'구좌·월정','제주특별자치도 제주시 구좌읍 구좌해안로 16','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13299.460421481424!2d126.7192491709648!3d33.5568809719494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d18e2b34606c3%3A0xe012a466bc2493af!2sGujwahaean-ro%2C%20Gujwa-eup%2C%20Cheju%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1664444858766!5m2!1sen!2skr'),(12,12,'표선·남원','제주특별자치도 서귀포시 남원읍 공천포로11번길 19','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3336.0620828306355!2d126.63854965044737!3d33.26486696616383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350dab1013dbe36b%3A0x8330c7431a98ac11!2zQ0FGReyngOuLiA!5e0!3m2!1sen!2skr!4v1664445439543!5m2!1sen!2skr');
/*!40000 ALTER TABLE `restaurantaddress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-30 10:19:51
