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
  `visible` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idAnnonce`),
  KEY `idPersonne` (`idPersonne`),
  CONSTRAINT `annonces_ibfk_1` FOREIGN KEY (`idPersonne`) REFERENCES `Personnes` (`idPersonne`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Annonces`
--

LOCK TABLES `Annonces` WRITE;
/*!40000 ALTER TABLE `Annonces` DISABLE KEYS */;
INSERT INTO `Annonces` VALUES (1,2,'Site internet','Recherche web designer pour la réalisation d\'un site internet','15€/h','2020-09-28 09:10:32',_binary ''),(2,4,'application Desktop','Réaliser application permettant de gérer les comptes de l\'entreprise','13€/h','2020-08-25 15:14:20',_binary ''),(3,5,'Realisation Reseaux epitech','Recablage complet du réseau epitech pour avoir une connexion plus stable suivant le nombre de personnes pouvant se connecter dessus','20€/h','2020-10-23 23:40:21',_binary ''),(4,1,'Post assistant dentaire','Recherche personne compétente pour m\'aider dans les tâches les plus complexes durant une intervention sur un patient','35€/h','2019-08-25 15:14:20',_binary ''),(5,3,'Creation Application Windows 10','Recherche une personne compétente pour l\'ajout d\'une appplication compatible Windows 10 permettant de gerer les appareil Connecté en USB','23€/h','2020-08-25 15:14:20',_binary ''),(6,3,'Cherche Alternance','Recherche une personne pour Alternance, une personne compétente dans le développement web, techno : nodeJs / Express','8€/h','2020-10-05 22:53:24',_binary '');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entreprises`
--

LOCK TABLES `Entreprises` WRITE;
/*!40000 ALTER TABLE `Entreprises` DISABLE KEYS */;
INSERT INTO `Entreprises` VALUES (1,'Epitech','montpellier','34000','Place Paul Bec','epitech.eu'),(2,'lasalle','avignon','84000','lavierge','lasalle.eu'),(3,'GOOGLE','NEW York','24000','rue de la solicone','google.com'),(4,'Amazon','NEW York','45898','rue de la Poste','Amazon.com'),(5,'microsoft','NEW York','73965','rue de Windows','microsoft.com');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Information`
--

LOCK TABLES `Information` WRITE;
/*!40000 ALTER TABLE `Information` DISABLE KEYS */;
INSERT INTO `Information` VALUES (3,1,2,1,'je vous envoyer ce message car votre annonce ma interpeler car je pense avoir tout les qualiter requise pour faire ce site internet','2020-08-25 15:14:20'),(4,2,4,2,'recruter moi SVP !!','2020-09-28 09:10:32'),(5,NULL,1,2,' coucou ca va toi ','2020-10-02 15:47:21'),(6,NULL,6,2,'je suis fait pour ce post !!','2020-10-02 16:06:01'),(7,NULL,6,2,'je suis fait pour ce post !!','2020-10-02 16:10:28'),(8,NULL,7,4,'dzad azd zad azdd azd','2020-10-02 16:11:03'),(9,4,6,3,'test pour le poste','2020-10-02 16:17:32'),(10,NULL,4,1,'je pense que je suis element qu\'il vous faut ..','2020-10-05 09:20:59'),(11,NULL,4,1,'je pense que je suis element qu\'il vous faut ..','2020-10-05 09:21:01'),(12,NULL,4,1,'je pense que je suis element qu\'il vous faut ..','2020-10-05 09:21:03'),(13,NULL,8,1,'je pense que je suis apte pour ce job','2020-10-05 09:25:20'),(14,NULL,9,2,'j\'aimerai postuler','2020-10-05 09:45:18'),(15,NULL,9,2,'j\'aimerai postuler','2020-10-05 09:45:32'),(16,NULL,10,4,'TEsttttttt','2020-10-05 09:48:16'),(17,NULL,10,4,'testttt','2020-10-05 09:50:43'),(18,NULL,10,4,'TEST message','2020-10-05 09:51:37'),(19,NULL,10,4,'test','2020-10-05 09:56:37'),(20,4,1,1,'coucou','2020-10-09 10:21:54'),(21,4,1,2,'test','2020-10-09 10:23:19'),(22,4,1,1,'je suis connecter','2020-10-09 10:39:27'),(23,NULL,11,1,'  coucou','2020-10-09 10:42:19'),(24,NULL,12,1,'je test un autre bug','2020-10-09 10:46:47'),(25,4,1,1,'test','2020-10-09 10:50:36'),(26,NULL,13,1,'cojouieifhjef','2020-10-09 10:50:56'),(27,4,1,1,'ezfezgegzegzf','2020-10-09 10:51:03'),(28,NULL,15,1,'ciziebf ezofhzeofpjezjofib ezbfn ofajf.','2020-10-10 10:30:55'),(29,NULL,16,6,'Coucou COMMENT TU VAs','2020-10-10 10:32:06');
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
  `admin` bit(1) DEFAULT b'0',
  PRIMARY KEY (`idPersonne`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `identifiant` (`identifiant`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `telephone` (`telephone`),
  KEY `idEntreprise` (`idEntreprise`),
  CONSTRAINT `personnes_ibfk_1` FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises` (`idEntreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personnes`
--

LOCK TABLES `Personnes` WRITE;
/*!40000 ALTER TABLE `Personnes` DISABLE KEYS */;
INSERT INTO `Personnes` VALUES (1,'fabienbouns','admin','bounoir','fabien','bounoirfabien@gmail.com','0783011304','M',4,'nXxlzeUsgzeuQQ6qOXXuPNYzaZJGgub3uCPTlBqxc9hS3DIl0u',_binary ''),(2,NULL,NULL,'ZE','BEEE','bzebze@gmail.com','0645372839','F',2,NULL,_binary '\0'),(3,NULL,NULL,'bounoir','fabien','fabbouns@gmail.com','0764836282','M',2,NULL,_binary '\0'),(4,'lemecWeird','password','mathieur','arthur','mathieuArthur@gmail.com','0735482637','M',3,'uRiq6piWNt5kEU8KaYO8vdVOHUkQgPtl1IjPifH5MSdSZ3MluF',_binary '\0'),(5,NULL,NULL,'bouns','Jean','BOUNSFabien@gmail.com','0423847437','F',1,NULL,_binary '\0'),(6,NULL,NULL,'Leroy','lea','leroylea@gmail.com','0783037404','F',4,NULL,_binary '\0'),(7,NULL,NULL,'eff','fabien','bounoirfabien13@gmail.com','0394384726','M',NULL,NULL,_binary '\0'),(8,NULL,NULL,'arckermann','theo','arckermanntheo@gmail.com','0732618493',NULL,NULL,NULL,_binary '\0'),(9,NULL,NULL,'boby','ponce','ponce13@gmail.com','0735263748',NULL,NULL,NULL,_binary '\0'),(10,NULL,NULL,'test','test','test@test.com','0735462865',NULL,NULL,NULL,_binary '\0'),(11,NULL,NULL,'jamis','coucou','coucou@test.fr','0748364536',NULL,NULL,NULL,_binary '\0'),(12,NULL,NULL,'jean','kevin','obyyyyy@outlook.fr','0394382326',NULL,NULL,NULL,_binary '\0'),(13,NULL,NULL,'efefef','eferv','efezff@gmail.com','0394382999',NULL,NULL,NULL,_binary '\0'),(14,NULL,NULL,'brugier','mathis','mathisbrugier@gmail.fr','0783537293','F',NULL,NULL,_binary '\0'),(15,NULL,NULL,'fgrgei','gigyigyg','feibif@hfbeif.fr','0938473626',NULL,NULL,NULL,_binary '\0'),(16,NULL,NULL,'izibibzcozi','iujdizd','idzduh@jbcioen.fr','0847364737',NULL,NULL,NULL,_binary '\0'),(18,'mathisbrugier','BOUNS','brugier','mathis','brubru@gmail.com','0748374637','F',NULL,'wN8kKFwoubWhOqFB09bhdjzdlaJJCNIUpEGBlRMXeAysd2VeO1',_binary '\0'),(19,'florent','BOUNS','boby','ponce','ponceBODY@gmail.com','0494382999','M',NULL,NULL,_binary '\0'),(20,'flavie','BOUNS','boby','ponce','ponce@gmail.com','0743382999','M',NULL,'c2NqZeAvBnYkHlhB6NBBDoy0bcz42NksPNdAoue7gZkdZ209zU',_binary '\0'),(21,'fefefezf','abcde','bounoir','richard','celineetrichard.bounoir@sfr.fr','0847364738','F',NULL,'i83OomARtaZPdlqpRI9bwu3g6984HUjfLdCeKOYiBkjKFKZ2ey',_binary '\0'),(22,'qqqff','poiu','bounoirfezfzf','fez','celineetrichard.bodedefefunoir@sfr.fr','0364564738','F',NULL,NULL,_binary '\0'),(23,'epjpjpj','kkk','efzpegzefe','felkkk','fnzofozo@gmail.com','0234575748','M',NULL,NULL,_binary '\0'),(25,'sjnfisn','wxc','poiu','fzfzf','abiojnib@gmail.com','0000000000','F',NULL,NULL,_binary '\0'),(26,'fff','asd','vpoefef','fegheett','beufbe@gmail.fr','9999999999','M',NULL,NULL,_binary '\0');
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

-- Dump completed on 2020-10-14 21:56:07
