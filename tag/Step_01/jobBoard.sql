-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: jobBoard
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
  `idEntreprise` int DEFAULT NULL,
  `idPersonne` int DEFAULT NULL,
  `titre` varchar(50) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `salaire` varchar(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `visible` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idAnnonce`),
  KEY `idPersonne` (`idPersonne`),
  KEY `idEntreprise` (`idEntreprise`),
  CONSTRAINT `annonces_ibfk_1` FOREIGN KEY (`idPersonne`) REFERENCES `Personnes` (`idPersonne`),
  CONSTRAINT `annonces_ibfk_2` FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises` (`idEntreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Annonces`
--

LOCK TABLES `Annonces` WRITE;
/*!40000 ALTER TABLE `Annonces` DISABLE KEYS */;
INSERT INTO `Annonces` VALUES (1,2,2,'Site internet','recherche web design pour la realisation d\'un site internet','15€/h','2020-09-28 09:10:32',_binary ''),(2,3,4,'application Desktop','realiser application permettant de gerer des compte','13€/h','2020-08-25 15:14:20',_binary ''),(3,1,5,'Realisation Reseaux epitech','recablage complet du reseaux epitech pour avoir une connexion plus stable suivant le nombre de personne pouvant ce connecter dessus','20€/h','2020-10-23 23:40:21',_binary ''),(4,4,1,'Post assistant dentaire','Recherche personne compétente dans le m\'aider dans les tâches les plus complexes','35€/h','2019-08-25 15:14:20',_binary '');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Information`
--

LOCK TABLES `Information` WRITE;
/*!40000 ALTER TABLE `Information` DISABLE KEYS */;
INSERT INTO `Information` VALUES (3,1,2,1,'je vous envoyer ce message car votre annonce ma interpeler car je pense avoir tout les qualiter requise pour faire ce site internet','2020-08-25 15:14:20'),(4,2,4,2,'recruter moi SVP !!','2020-09-28 09:10:32'),(5,NULL,1,2,' coucou ca va toi ','2020-10-02 15:47:21'),(6,NULL,6,2,'je suis fait pour ce post !!','2020-10-02 16:06:01'),(7,NULL,6,2,'je suis fait pour ce post !!','2020-10-02 16:10:28'),(8,NULL,7,4,'dzad azd zad azdd azd','2020-10-02 16:11:03'),(9,4,6,3,'test pour le poste','2020-10-02 16:17:32');
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
  PRIMARY KEY (`idPersonne`),
  KEY `idEntreprise` (`idEntreprise`),
  CONSTRAINT `personnes_ibfk_1` FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises` (`idEntreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personnes`
--

LOCK TABLES `Personnes` WRITE;
/*!40000 ALTER TABLE `Personnes` DISABLE KEYS */;
INSERT INTO `Personnes` VALUES (1,NULL,NULL,'bounoir','fabien','bounoirfabien@gmail.com','0783011304','M',NULL),(2,NULL,NULL,'ZE','BEEE','bzebze@gmail.com','0645372839','F',NULL),(3,NULL,NULL,'bounoir','fabien','bounoirfabien@gmail.com','0764836282','M',NULL),(4,NULL,NULL,'Mathieur','Arthur','mathieuArthur@gmail.com','0735482637','M',NULL),(5,NULL,NULL,'bouns','Jean','BOUNSFabien@gmail.com','0423847437','F',NULL),(6,NULL,NULL,'Leroy','lea','leroylea@gmail.com','0783037404','F',4),(7,NULL,NULL,'eff','fabien','bounoirfabien13@gmail.com','0783011304','M',NULL);
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

-- Dump completed on 2020-10-04 19:45:49
