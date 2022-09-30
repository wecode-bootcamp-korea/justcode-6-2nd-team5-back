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
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `intro` varchar(500) DEFAULT NULL,
  `businessHour` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(100) DEFAULT NULL,
  `closedDay` varchar(50) DEFAULT NULL,
  `reviewPoint` double DEFAULT NULL,
  `totalLike` int DEFAULT NULL,
  `reviewCount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'태성흑돈','사장님이 직접 구워 주는 흑돼지 맛집! 제주 멜젓을 곁들인 육즙 팡팡 터지는 고기를 먹으면 지금 제주에 있음을 실감하게 됩니다. 계란찜, 콩나물 무침 등 다양한 밑반찬 중에서도 깻잎 장아찌가 별미 포인트! 쫀득한 고기와 새콤한 깻잎 무침의 환상의 궁합을 경험해보세요.','12:30 ~ 22:30','070-1234-1234','연중무휴',3.5238095238095233,0,14),(2,'동뜬식당','신선한 재료만 고집하는 사장님의 음식 철학이 담긴 맛집. \'성산 갈치조림 맛집\'으로 유명하지만 다양한 물회와 해산물 요리 전부가 각자 제 맛을 뽐내는 곳이죠. 가족이 모두 즐거운 식사를 할 수 있도록 유아 놀이방을 갖춘게 킬링 포인트! 손님을 배려하는 사장님의 푸근한 마음까지 느껴보세요!','07:00 ~ 17:00','070-1234-1234','연중무휴',2.6666666666666665,0,5),(3,'오로섬','공항 근처 생선구이 맛집. 옥돔, 갈치, 고등어 구이뿐만 아니라 황게뚝배기, 성게미역국, 간장게장 등 다양한 해산물 요리를 만날 수 있어요. 특히 제주 향토음식 경연대회에서 수상한 찐 맛집!','10:00 ~ 21:00','070-1234-1234','연중무휴',2.5,0,0),(4,'훈남횟집','깔끔하고 세련된 공간에서 맛보는 싱싱한 활어회, 신선하고 쫀듯한 딱새우 회는 제주에서 지나칠 수 없는 별미! 삶은 소라, 문어 딱새우 회를 동시에 맛볼 수 있는 딱새우 삼합도 인기 메뉴입니다. 신선하고 맛있는 딱새우를 다양한 방법으로 즐겨보세요!','12:00 ~ 23:00','070-1234-1234','연중무휴',2.5,0,0),(5,'마루나키친','고즈넉한 분위기의 퓨전음식점, 달콤하고 짭조름한 딱새우장 정식은 남녀노소 누구나 취향저격! 또한 제주산 돼지고기를 이용해 만든 두툼한 마루나 돈가츠도 빼놓을 수 없는 메뉴입니다. 깔끔한 인테리어와 창 너머 보이는 바다를 배경으로 맛있는 한 끼를 즐겨보세요!','11:00 ~ 20:00 ','070-1234-1234','연중무휴',2.5,0,0),(6,'맛의고수','매일 입고되는 제주산 식재료로 맛의 신선함을 더해주는 곳. 전복이 들어간 흑돼지 돈가스부터 분식류까지 제주의 맛을 느낄 수 있는 다양한 메뉴들을 만나볼 수 있어요. 특히 신선한 해물이 가득 들어간 제주 품은 해물떡볶이는 꼭 먹어야 할 대표 메뉴이자 인기 메뉴입니다!','11:00 ~ 21:00 ','070-1234-1234','수요일',2.5,0,0),(7,'꽃썸피자','불고기가 들어간 육식주의자 피자가 인기메뉴. 평화로 끝자락 고급진 수제맥주와 함께 즐기는 피자 맛집. 마리게리따, 스노우화이트, 로제파스타 등 다양한 메뉴를 즐길 수 있어요. 불고기 피자를 좋아한다면 꼭 \'육식주의자\' 메뉴를 맛볼 것! 불고기의 더욱 깊은 풍미를 느낄 수 있답니다.','11:30 ~ 21:00 ','070-1234-1234','수요일',2.5,0,0),(8,'고흐의편지','일출랜드 근처 이색 사진 기록을 남길 수 있는 고흐 테마 카페. 카페 이름처럼 수채화 팔레트를 비롯해 고흐의 자화상과 작품이 인테리어가 되는 곳이에요. 벽면이 꽉 찬 거대한 그림이 진짜 작품 속으로 들어온 듯한 착각이 들게 합니다. 향긋한 커피를 마시고 분위기를 감상하며 특별한 휴식시간을 즐기세요.','09:30 ~ 17:30 ','070-1234-1234','월,금',2.5,0,0),(9,'오크라','갓 튀겨진 돈가스를 바로 맛볼 수 있는 숨겨진 수제 돈가스 맛집, 깨끗한 기름과 최고의 재료만을 사용한 도톰하고 바삭한 수제 돈가스를 맛볼 수 있어요. 주문 시 같이 나오는 샐러드도 신선한 과일과 채소를 사용한 푸짐한 양으로 메인 메뉴라고 생각될 만큼 고퀄리티입니다.','12:00 ~ 21:00','070-1234-1234','월',2.5,0,0),(10,'메밀꽃제주','제주 음식박람회에서 수상한 사장님이 직접 면을 뽑는 메밀 맛집입니다. 메밀꽃이 유명한 와흘에서 \'메밀 막국수\' 한 그릇 어떠신가요. 밑반찬까지 사장님이 직접 만들고 매일 바뀝니다. 모든 메뉴 포장 가능합니다.','10:30 ~ 15:00 ','070-1234-1234','일요일',2.5,0,0),(11,'레드썬셋','싱싱한 광어로 만든 요리를 맛 볼 수있는 곳으로 일식뿐만아니라 카페이용도 함께 가능한 곳입니다. 탁 트인 바다를 바라보면 여유있는 식사를 즐길 수 있는 음식점입니다.','09:00 ~ 22:00','070-1234-1234','월요일',2.5,0,0),(12,'카페지니','제주 1호 제과 기능장이 오너 셰프로 있는 베이커리 전문점. 천연발효종으로 만들어지는 스콘, 쿠키, 파운드 등 가지각색의 빵들을 즐길 수 있는 곳이에요. 바다 색감의 ‘공천포 에이드’와 달콤한 ‘천혜향도르’가 이곳 시그니처! 달달한 음료와 빵, 잔잔한 바다까지, 이곳에서 행복한 여유를 즐기세요.','10:00 ~ 22:00','070-1234-1234','월요일',2.5,0,0);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
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
