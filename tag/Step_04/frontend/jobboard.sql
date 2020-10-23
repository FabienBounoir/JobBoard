CREATE DATABASE jobboard

CREATE TABLE `Personnes` (
    `identifiant` int AUTO_INCREMENT,
    `nom` VARCHAR(30),
    `prenom` VARCHAR(30),
    `mail` VARCHAR(50),
    `telephone` CHAR(10),
    `sexe` CHAR(1),
    primary key (identifiant)
);

CREATE TABLE `Entreprises` (
    `idEntreprise` int AUTO_INCREMENT,
    `nom` VARCHAR(30),
    `ville` VARCHAR(30),
    `codePostal` VARCHAR(5),
    `rue` CHAR(50),
    `site` CHAR(40),
    PRIMARY KEY (idEntreprise)
);

CREATE TABLE `Information` (
    `idEntreprise` int,
    `identifiant` int,
    `idAnnonce` int,
    `message` text,
    `date` datetime,
    PRIMARY KEY (`idEntreprise`, `identifiant`, `idAnnonce`)
);

CREATE TABLE `Annonces` (
    `idAnnonce` int AUTO_INCREMENT,
    `idEntreprise` int,
    `identifiant` int,
    `titre` VARCHAR(50),
    `description` VARCHAR(150),
    `date` datetime,
    `visible` BIT,
    PRIMARY KEY (`idAnnonce`, `identifiant`)
);

ALTER TABLE `Information` ADD FOREIGN KEY (`identifiant`) REFERENCES `Personnes`(identifiant);

ALTER TABLE `Information` ADD FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises`(idEntreprise);
 
ALTER TABLE `Information` ADD FOREIGN KEY (`idAnnonce`) REFERENCES `Annonces`(idAnnonce);

ALTER TABLE `Annonces` ADD FOREIGN KEY (`identifiant`) REFERENCES `Personnes`(identifiant);

ALTER TABLE `Annonces` ADD FOREIGN KEY (`idEntreprise`) REFERENCES `Entreprises`(idEntreprise);


insert into Personnes (nom,prenom,mail,telephone,sexe)values 
(1,"bounoir","fabien","bounoirfabien@gmail.com","0783011304","M"),
(2,"ZE","BEEE","bzebze@gmail.com","0645372839","F"),
(3,"bounoir","fabien","bounoirfabien@gmail.com","0764836282","M"),
(4,"Mathieur","Arthur","mathieuArthur@gmail.com","0735482637","M"),
("bouns","Jean","BOUNSFabien@gmail.com","0423847437","F");

insert into Entreprises (nom, ville, codePostal, rue, site)values 
(1,"Epitech","montpellier","34000","Place Paul Bec","epitech.eu"),
(2,"lasalle","avignon","84000","lavierge","lasalle.eu"),
("GOOGLE","NEW York","24000","rue de la solicone","google.com"),
("Amazon","NEW York","45898","rue de la Poste","Amazon.com");


insert into Information (idEntreprise, identifiant, idAnnonce, message, date)
values (1,2,1,"recherche develloper full stack pour realisation site internet","2020-08-25 15:14:20.000000" ),
(2,4,2,"je sais pas encore pourquoi mais j'en est besoin","2020-09-28 09:10:32.000000" );

insert into Annonces (idEntreprise, identifiant,titre,description,date,visible)
values 
(2,2,"Site internet", "recherche web design pour la realisation d'un site internet","2020-09-28 09:10:32.000000", true),
(3,4,"application Desktop", "realiser application permettant de gerer des compte","2020-08-25 15:14:20.000000", true),
(1,5,"Realisation Reseaux epitech", "recablage complet du reseaux epitech pour avoir une connexion plus stable suivant le nombre de personne pouvant ce connecter dessus","2020-10-23 23:40:21.000000", true),
(4,1,"Post assistant dentaire","Recherche personne compétente dans le m'aider dans les tâches les plus complexes","2019-08-25 15:14:20.000000", true);

udpate Annonces set description= 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' where idAnnonce=1;