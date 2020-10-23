const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'jobboard1',
  multipleStatements: true
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
    res.header('Content-Type', 'application/json');
    app.use(bodyParser.json());
    next();
  });

app.use(bodyParser.json());

//pas operationnel
app.post('/add', (req, res, next) => {
  console.log(req.body);
  console.log("lastName= " + req.body.nom)
  console.log("firstName= " + req.body.prenom)
  console.log("Email= " + req.body.email)
  console.log("tel= " + req.body.tel)
  console.log("message= " + req.body.message)
  console.log("idAnnonce= " + req.body.idAnnonce)

  //tester si la personne existe
  connection.query('SELECT EXISTS( SELECT mail FROM Personnes WHERE mail= "' + req.body.email + '" ) AS Exist', function(err, rows, fields) {
    if (err) throw err;
    console.log('Personne exist: ', rows[0].Exist);

    //ajout de la personne si elle n'existe pas
    if(rows[0].Exist == "0"){
        connection.query('insert into Personnes (nom,prenom,mail,telephone) values ("'+req.body.nom+'","'+req.body.prenom+'","'+req.body.email+'","'+req.body.tel+'")')
    }

    //ajout a la table information
    connection.query('SELECT idPersonne, idEntreprise from Personnes where mail="'+ req.body.email +'"', function(erreur, rowse) {
      if (erreur) throw erreur;

      console.log("id personne= " + rowse[0].idPersonne)
      console.log("id entreprise= " + rowse[0].idEntreprise)
      connection.query('insert into Information (idPersonne, idEntreprise, idAnnonce, message) value ('+ rowse[0].idPersonne +','+ rowse[0].idEntreprise + ','+ req.body.idAnnonce + ',"'+ req.body.message +'")')
    });

});

  res.status(201).json({
    message: 'success'
  });

});


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
  console.log("idAnnonce =" + req.params.id)
      connection.query('select Entreprises.nom, site, salaire, titre, rue, ville, codePostal, description, date_format(date, "%d/%m/%Y à %H:%i") from Annonces inner join Personnes on Annonces.idPersonne = Personnes.idPersonne inner join Entreprises on Personnes.idEntreprise = Entreprises.idEntreprise where idAnnonce =' + req.params.id, function(err, rows, fields) {
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