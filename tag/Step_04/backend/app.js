const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'jobboard'
});

connection.connect(function(err) {

    if (err) throw err;
 
    console.log("Connecté à la base de données MySQL!");
 
  });

//test de requete
connection.query('select nom from Entreprises where idEntreprise = 1', function(err, rows, fields) {
    if (err) throw err;
    console.log('connection test: ', rows);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    app.use(bodyParser.json());
    next();
  });

app.use(bodyParser.json());

//recupere tout les annonces de la basse de donnée puis les transmet au client
app.get('/annonces', (req, res, next) => {
    connection.query('select idAnnonce, titre, description from Annonces where visible=1', function(err, rows, fields) {
    if (err) throw err;
    console.log('recuperation Annonce:', rows);
    res.status(200).json(rows);
  });
});

//recuperer les information d'une annonce specifique
app.get("/information/:id", (req, res, next) => {
  console.log("select description from Annonces where idAnnonce =" + req.params.id)
      connection.query("select titre, description from Annonces where idAnnonce =" + req.params.id, function(err, rows, fields) {
      if (err) throw err;
      console.log('information annonce recuperer:', rows);
      res.status(200).json(rows);
    });
});

//modifier un utilisateur
app.put("/mod", (req, res, next) => {
  console.log("idAnnonce =" + req.params.id)
      connection.query('update Personnes set identifiant=' + req.body.identifiant + ' , motdepasse=' + req.body.motdepasse + ', nom=' + req.body.nom + ',prenom=' + req.body.prenom + ',mail=' + req.body.mail + ',telephone' + req.body.tel + ',sexe' + req.body.sexe + ' where idPersonne=' + req.body.idPersonne, function(err, rows, fields) {
      if (err) throw err;
      console.log('modificationPersonne:', req.body.idPersonne);
    });
});

//supprimer un utilisateur
app.delete("/delete", (req, res, next) => {
  console.log("idAnnonce =" + req.params.id)
      connection.query('delete from Personnes where idPersonne=' + req.body.idPersonne, function(err, rows, fields) {
      if (err) throw err;
      console.log('modificationPersonne:', req.body.idPersonne);
    });
});

module.exports = app;