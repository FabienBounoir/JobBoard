# Projet JobBoard

## Présentation

Le projet **JobBoard** a été crée dans le but de mettre en relation des entreprises avec des personnes souhaitant cherche un travail.
Les entreprise post leurs annonces, les personnes souhaitant postuler en remplissant un formulaire sur le site.

## Mise en route du serveur 

- Avoir installé **mysql**

- crée la **bdd** sur mysql --> create database jobboard

- ajouter bdd **jobboad**  --> mysql -u "nomUser" -p jobboard < jobBoard.sql

- **Dépendance** : 
    - **body-parser**   --> **npm** install body-parser
    - **express**      --> **npm** install --save express 
    - **mysql**
    
lancer le serveur :
  --> **npm** start server.js
  
  
## Description des fichiers

- **server.js** <-- contient la configuration du serveur
- **app.js** <-- contient l'api du serveur
- **jobBoard.sql** <-- contient la base de données
- **annonces.html** <-- contient le site internet
- **style.css** <-- mise en forme du site
- **script.js** <-- contient les différentes requêtes au serveur
- **panel.js** <-- contient les differentes requete pour mettre a jour le profils
- **panel.html** <-- contient la page html pour modifier son compte
- **admin.js** <-- contient les differentes requete pour administrer les tables de la bdd
- **admin.html** <-- contient la page html qui administre la bdd

## Informations

- Auteur **Fabien Bounoir** <bounoirfabien@gmail.com>

**JobBoard 2020**

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
