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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `profileImg` varchar(200) DEFAULT NULL,
  `birth` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(100) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'oh',NULL,'19920323','010-9898-9898','male','nnn@nnnn.com','$2a$12$xmgjV84vn9g21JpjzpseDOWWzroad0/0syWbcXwbV27Dsy2jsSX4G','2022-09-20 04:03:17'),(2,'cat',NULL,'19900101','010-1111-2222','male','nnn@nnne.com','$2a$12$S25KsDFHim10xxnQf3gMduTx9Se8WZO72qXZ28mX72Hg7BlmJN5iC','2022-09-20 04:23:02'),(3,'lee',NULL,'19990909','010-5555-5555','male','zzzz@zzzz.zzz','$2a$12$NBRpQaPFQUy6Eefrkitm7e2mvCCHr7PmQMMDyX4yg840Bqd0RdXr6','2022-09-22 15:25:02'),(4,'ddd',NULL,'19990909','010-0001-1231','male','zzzz@zzz.zzz','$2a$12$DheexBw1MuSs69pAHbnCq.TqNpMCnNov0h9Zam7ePh0i96d4X1.vO','2022-09-22 15:26:05'),(5,'cat',NULL,'19990909','010-5555-5555','male','zmz11@ccc.ccc','$2a$12$xaFCdOzp7h1pOuoVm5cd7.trDMhNKY5wrzwXqxDncEMXbiKllAHCy','2022-09-22 15:42:52'),(6,'ddd',NULL,'19990909','010-5555-5555','male','asdasd@asdasd.asdasd','$2a$12$WiSv2GvR8MczFn0Z4Y7ZYOSh4esFWfd9FsKfJGWz9lZIOQM4d.z.C','2022-09-22 15:52:47'),(7,'김하마',NULL,'19990909','010-5555-5555','male','eee@eee.eee','$2a$12$1XKT3mIOvD6puoq67jJb7efbeQ6hOjMCg0mQwiGggL1slX21WS1nm','2022-09-29 07:51:17'),(8,'정예원',NULL,'20220929','010-1111-1111','male','meong19@gmail.com','$2a$12$nLJ5MOh1qBmeM6wwMPoGletcnMXWNPP4hCefaXWXtybNvMKN5WEom','2022-09-29 12:19:39'),(9,'김큭',NULL,'19990909','010-5555-5555','male','zmz@zmz.zmz','$2a$12$BMO/6xwxC8nGT44B57H/ceqV4podTJe8dFzZBe/Ny7IWJZQn8w4Hy','2022-09-29 13:46:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
