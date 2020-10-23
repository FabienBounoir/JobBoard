-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: jobboard
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Annonces`
--

DROP TABLE IF EXISTS `Annonces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Annonces` (
  `idAnnonce` int NOT NULL AUTO_INCREMENT,
  `idPersonne` int DEFAULT NULL,
  `titre` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `salaire` varchar(20) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `visible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`idAnnonce`),
  KEY `idPersonne` (`idPersonne`),
  CONSTRAINT `annonces_ibfk_1` FOREIGN KEY (`idPersonne`) REFERENCES `Personnes` (`idPersonne`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Annonces`
--

LOCK TABLES `Annonces` WRITE;
/*!40000 ALTER TABLE `Annonces` DISABLE KEYS */;
INSERT INTO `Annonces` VALUES (1,2,'Site internet','Recherche web designer pour la réalisation d\'un site internet','15€/h','2020-09-28 09:10:32',1),(2,4,'application Desktop','Réaliser application permettant de gérer les comptes de l\'entreprise','13€/h','2020-08-25 15:14:20',1),(3,5,'Realisation Reseaux epitech','Recablage complet du réseau epitech pour avoir une connexion plus stable suivant le nombre de personnes pouvant se connecter dessus','20€/h','2020-10-23 23:40:21',1),(4,1,'Post assistant dentaire','Recherche personne compétente pour m\'aider dans les tâches les plus complexes durant une intervention sur un patient','35€/h','2019-08-25 15:14:20',1),(5,3,'Creation Application Windows 10','Recherche une personne compétente pour l\'ajout d\'une appplication compatible Windows 10 permettant de gerer les appareil Connecté en USB','23€/h','2020-08-25 15:14:20',1),(7,46,'jobboard','rejoindre l\'equipe de développement pour finaliser le projet qui commence a ralentir','10$/h','2020-10-16 13:33:44',1),(9,46,'recherche equipe !!','je suis activement a la recherche de personne compétent pour m\'épauler a la realisation d\'un site regroupant des annnonces pour trouver du boulot ','400€/h','2020-10-18 20:37:34',1),(10,4,'cherche cuisinier','recherche cuisinier pour me faire a manger TOUT les jours merci d\'avance pour les gens qui postule a cette annonce','20¥/h','2020-10-18 20:40:08',1),(11,53,'monteur','recherche monteur Pneu motiver !!!','50€/h','2020-10-18 21:16:33',1);
/*!40000 ALTER TABLE `Annonces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Entreprises`
--

DROP TABLE IF EXISTS `Entreprises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Entreprises` (
  `idEntreprise` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) DEFAULT NULL,
  `ville` varchar(30) DEFAULT NULL,
  `codePostal` varchar(5) DEFAULT NULL,
  `rue` char(50) DEFAULT NULL,
  `site` char(40) DEFAULT NULL,
  PRIMARY KEY (`idEntreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entreprises`
--

LOCK TABLES `Entreprises` WRITE;
/*!40000 ALTER TABLE `Entreprises` DISABLE KEYS */;
INSERT INTO `Entreprises` VALUES (1,'Epitech','montpellier','34000','Place Paul Bec','https://www.epitech.eu/'),(2,'lasalle','avignon','84000','lavierge','http://www.lasalle84.net/'),(3,'GOOGLE','NEW York','24000','rue de la solicone','https://www.google.fr/'),(4,'Amazon','NEW York','45898','rue de la Poste','https://www.amazon.com/'),(6,'pouleEmploit','montpellier','34000','rue des poule','http://10.101.52.235/'),(8,'ad\'hocpneu','chateaurenard','13870','boulevard geunevaix','http://adhocpneu.fr/');
/*!40000 ALTER TABLE `Entreprises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Information`
--

DROP TABLE IF EXISTS `Information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Information` (
  `idInformation` int NOT NULL AUTO_INCREMENT,
  `idEntreprise` int DEFAULT NULL,
  `idPersonne` int DEFAULT NULL,
  `idAnnonce` int DEFAULT NULL,
  `message` text,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idInformation`),
  KEY `idPersonne` (`idPersonne`),
  KEY `idEntreprise` (`idEntreprise`),
  KEY `idAnnonce` (`idAnnonce`),
  CONSTRAINT `information_ibfk_1` FOREIGN KEY (`idPersonne`) REFERENCES `Personnes` (`idPersonne`),
  CONSTRAINT `information_ibfk_2` FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises` (`idEntreprise`),
  CONSTRAINT `information_ibfk_3` FOREIGN KEY (`idAnnonce`) REFERENCES `Annonces` (`idAnnonce`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Information`
--

LOCK TABLES `Information` WRITE;
/*!40000 ALTER TABLE `Information` DISABLE KEYS */;
INSERT INTO `Information` VALUES (4,2,4,2,'recruter moi SVP !!','2020-09-28 09:10:32'),(31,2,2,3,'ce serait pour postuler voila BISOUS !','2020-10-16 23:58:39'),(32,NULL,50,2,'Mr le directeur je suis très heureux de vous annoncé que je suis a votre disposition pource job ','2020-10-18 20:31:47'),(33,NULL,51,7,'demande de rejoindre la Z corporation !!! Please','2020-10-18 20:33:02'),(34,NULL,52,4,'j\'aimerai essayer de postuler a cette offre Merci !!','2020-10-18 20:34:14');
/*!40000 ALTER TABLE `Information` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Personnes`
--

DROP TABLE IF EXISTS `Personnes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Personnes` (
  `idPersonne` int NOT NULL AUTO_INCREMENT,
  `identifiant` varchar(30) DEFAULT NULL,
  `motdepasse` varchar(30) DEFAULT NULL,
  `nom` varchar(30) DEFAULT NULL,
  `prenom` varchar(30) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `telephone` char(10) DEFAULT NULL,
  `sexe` char(1) DEFAULT NULL,
  `idEntreprise` int DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idPersonne`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `identifiant` (`identifiant`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `telephone` (`telephone`),
  KEY `idEntreprise` (`idEntreprise`),
  CONSTRAINT `personnes_ibfk_1` FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises` (`idEntreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personnes`
--

LOCK TABLES `Personnes` WRITE;
/*!40000 ALTER TABLE `Personnes` DISABLE KEYS */;
INSERT INTO `Personnes` VALUES (1,'fabienbouns','admin','bounoir','fabien','bounoirfabien@gmail.com','0783011304','M',4,'lPXGRKTFioC81AaXOZExYvuWx3nYZLMic8zW5h5PUY80Wz2fek',1),(2,'the','bee','bzzz','bzzz','bzebze@gmail.com','0645372839','M',2,'axyY45waExpnoAGVqvZhCkJDpSLsMeWsodFRxdkWsZ7Ttb8BvI',1),(3,NULL,'null','bounoir','fabien','fabbouns@gmail.com','0764836282','M',2,NULL,0),(4,'lemecWeird','password','mathieur','arthur','mathieuArthur@gmail.com','0735482637','M',3,'uRiq6piWNt5kEU8KaYO8vdVOHUkQgPtl1IjPifH5MSdSZ3MluF',0),(5,NULL,NULL,'bouns','Jean','BOUNSFabien@gmail.com','0423847437','F',1,NULL,0),(6,NULL,NULL,'Leroy','lea','leroylea@gmail.com','0783037404','F',4,NULL,0),(18,'mathisbrugier','BOUNS','brugier','mathis','brubru@gmail.com','0748374637','F',NULL,'wN8kKFwoubWhOqFB09bhdjzdlaJJCNIUpEGBlRMXeAysd2VeO1',0),(20,'flavie','BOUNS','boby','ponce','ponce@gmail.com','0743382999','M',NULL,'obImrqk3O92FUzFghCB7329y6oHDcs8gAHfldPvmRpvonbaTYh',0),(46,'cameron','cameron','cameron','saucise','camero@mail.Com','0465434242','M',6,'liTn1NxX7JwE4qsq61ouY7yuEW4dRATHKEhdHYNDIkwIJBMnEl',1),(48,'lena','azerty','situation','lena','lena@gmail.com','0987654832','F',NULL,'nKjwzLhgjmCMw6FypwcJ9VYJQBOxyzqDxnQ1hPFLfdpE4WkTpR',0),(49,NULL,NULL,'adrien','roux','roux@epitech.eu','0234574384','M',NULL,NULL,0),(50,NULL,NULL,'moman','jean','jeanrouxel@laposte.fr','0037463523',NULL,NULL,NULL,0),(51,NULL,NULL,'zevent','zerator','zerator@zevent.fr','0385352343',NULL,NULL,NULL,0),(52,NULL,NULL,'test','test','test@test.com','0293746542',NULL,NULL,NULL,0),(53,'richard','zevent','richard','bounoir','richard.bounoir@yahoo.fr','0490900632','M',8,NULL,1);
/*!40000 ALTER TABLE `Personnes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-18 21:33:04
