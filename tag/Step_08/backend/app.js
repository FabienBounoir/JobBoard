const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var mysql      = require('mysql');
const e = require('express');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'jobboard',
  multipleStatements: true
});

//connexion à la bdd
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
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

//recuperation form
app.post('/form-send', (req, res, next) => {
  console.log(req.body);
  console.log("lastName= " + req.body.nom)
  console.log("firstName= " + req.body.prenom)
  console.log("Email= " + req.body.email)
  console.log("tel= " + req.body.tel)
  console.log("message= " + req.body.message)
  console.log("idAnnonce= " + req.body.idAnnonce)

  //tester si la personne existe
  connection.query('SELECT EXISTS( SELECT mail FROM Personnes WHERE mail= "' + req.body.email.toLowerCase() + '" ) AS Exist', function(err, rows, fields) {
    if (err) throw err;
    console.log('Personne exist: ', rows[0].Exist);

    //ajout de la personne si elle n'existe pas
    if(rows[0].Exist == "0"){
        connection.query('insert into Personnes (nom,prenom,mail,telephone) values ("'+req.body.nom.toLowerCase()+'","'+req.body.prenom.toLowerCase()+'","'+req.body.email.toLowerCase()+'","'+req.body.tel+'")')
    }

    //ajout a la table information
    connection.query('SELECT idPersonne, idEntreprise from Personnes where mail="'+ req.body.email.toLowerCase() +'"', function(erreur, rowse) {
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

//connexion
app.post('/connexion', (req, res, next) => {

  //tester si la personne existe
  connection.query('SELECT EXISTS( select identifiant, motdepasse from Personnes where identifiant = "'+req.body.identifiant+'" && motdepasse = "'+req.body.password+'" ) AS Exist', function(err, rows, fields) {
    if (err) throw err;
    console.log('Personne exist: ', rows[0].Exist);

    //test si la personne existe
    if(rows[0].Exist == "1"){
        connection.query('select idPersonne, nom, prenom, identifiant, mail, sexe, telephone, admin from Personnes where identifiant = "'+req.body.identifiant+'" && motdepasse = "'+req.body.password+'"', function(erreur, rowse) {
          if (erreur) throw erreur;
          console.log("id personne= " + rowse[0].idPersonne)
          
          //generation token connexion
          let tokenConnexion = strRandom({
            includeUpperCase: true,
            includeNumbers: true,
            length: 50,
            startsWithLowerCase: true
          });

          connection.query('update Personnes SET token = "'+ tokenConnexion +'" where idPersonne = '+ rowse[0].idPersonne +'')
          
          res.json({
            code:'200',
            message: 'connexion OK !',
            rowse,
            token: tokenConnexion
          });
        });
    }
    else
    {
      console.log("Identifiant ou le mot de passe est incorrect !")
      res.json({
        code: '400',
        erreur: 'Identifiant ou mot de passe est incorrect !'
      });
    }

  });
});

app.post('/authentification', (req, res, next) => {
  console.log("authentifaiction :" +req.body.token)

      connection.query('SELECT EXISTS( select idPersonne from Personnes where token = "'+req.body.token+'") AS Exist', function(err, requete, fields) {
        if (err) throw err;

        if(requete[0].Exist == "1" && req.body.token != null){  
          console.log("token Valide")  
          connection.query('select admin from Personnes where token = "'+req.body.token+'"', function(erreur, requeteAdmin) {  
            res.json({
              code:'200',
              message: 'tokenSucess',
              requeteAdmin
            });
          })
        }
        else
        {
          console.log("token incorrect")
          res.json({
            code: '400',
            erreur: 'tokenErreur'
          });
        }
      });
});


app.post('/register', (req, res, next) => {
  console.log(req.body)
  // console.log(testTelephone(req.body.tel))
  //ne pas oublier --> .toLowerCase()                                         userName

  connection.query('SELECT EXISTS( select idPersonne from Personnes where mail = "'+ req.body.email.toLowerCase() +'" || telephone = "' + req.body.tel + '" ) AS Exist', function(err, rows, fields) {
      if(rows[0].Exist == "1")
      {
        console.log("update")
          //update
          connection.query('update Personnes set identifiant="' + req.body.userName + '" , motdepasse="' + req.body.password + '", nom="' + req.body.lastName.toLowerCase() + '",prenom="' + req.body.firstName.toLowerCase() + '",telephone="' + req.body.tel + '",sexe="' + req.body.gender + '" where mail="' + req.body.email.toLowerCase() +'"', function(err, rows, fields) {
            if (err) throw err;
            console.log('la personne existe deja: ');
            res.json({
              code:'200',
              message: 'personne mise à jour',
            });
          });
      }
      else
      {
        console.log("create")
          //create
          connection.query('insert into Personnes (nom,prenom,mail,telephone,sexe,identifiant,motdepasse) value ("'+ req.body.lastName.toLowerCase() +'","'+ req.body.firstName.toLowerCase() + '","'+ req.body.email.toLowerCase() + '","'+ req.body.tel +'","'+ req.body.gender +'","'+ req.body.userName +'","'+ req.body.password +'")', function(err, rows, fields) {
            if (err) throw err;

            console.log('ajout reussi');
            res.json({
              code:'200',
              message: 'ajout reussi',
            });
          });
      }
  })
});

//generer token de connexion
function strRandom(o) {
  var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      g = ''+b;
  if (o) {
    if (o.startsWithLowerCase) {
      c = b[Math.floor(Math.random() * b.length)];
      d = 1;
    }
    if (o.length) {
      a = o.length;
    }
    if (o.includeUpperCase) {
      g += b.toUpperCase();
    }
    if (o.includeNumbers) {
      g += '1234567890';
    }
  }
  for (; d < a; d++) {
    c += g[Math.floor(Math.random() * g.length)];
  }
  return c;
}

//recupere tout les annonces de la bdd puis les transmet au client
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

//recuperer les information d'une annonce specifique
app.get("/selectTable/:table", (req, res, next) => {
  console.log("idAnnonce =" + req.params.table)
      connection.query('select * from ' + req.params.table, function(err, rows, fields) {
      if (err) throw err;
      console.log('recuperation de la table :', rows);
      res.status(200).json(rows);
    });
});

//modifier le password utilisateur
app.put("/password", (req, res, next) => {
  console.log("password ancien =" + req.body.oldPassword)
  console.log("new password =" + req.body.newPassword)
  console.log("token =" + req.body.token)

      connection.query('update Personnes set motdepasse="' + req.body.newPassword + '" where token="' + req.body.token + '" && motdepasse="'+ req.body.oldPassword+ '"', function(err, rows, fields) {
      if (err) throw err;
      console.log('test:', rows.changedRows);
      if(rows.changedRows ==1)
      {
        res.json({
          code:'200',
          message: 'modification password reussi !',
        });
      }
      else
      {
        res.json({
          code:'400',
          message: 'erreur lors du changement de password',
        });
      }
    });
    res.status(200);
});

//modifier les informations utilisateur
app.put("/newInformation", (req, res, next) => {
  
      connection.query('update Personnes set identifiant="' + req.body.identifiant + '", prenom="' + req.body.firstName + '", nom="' + req.body.lastName + '", telephone="' + req.body.tel + '", sexe="' + req.body.gender + '", mail="' + req.body.email + '" where token="' + req.body.token + '" ', function(err, rows, fields) {
      if (err) throw err;
      console.log('test:', rows.changedRows);
      if(rows.changedRows ==1)
      {
        res.json({
          code:'200',
          message: 'modification des information reussi !',
        });
      }
      else
      {
        res.json({
          code:'400',
          message: 'erreur lors du changement des informations',
        });
      }
    });
    res.status(200);
});

//supprimer une ligne d'une table (page admin)
app.delete("/delete", (req, res, next) => {
  console.log(req.body.table)
  if(req.body.table == "Personnes")
  {
    connection.query('delete from Information where idPersonne=' + req.body.id, function(err, rowse) {
      if (err) throw err;
      connection.query('delete from Personnes where idPersonne=' + req.body.id, function(err, rows) {
        if (err) throw err;
        console.log('SuppressionPersonne:', req.body);
      });

      res.json({
        code:'200',
        message: 'suppression reussi',
      });
    });
  }
  else if(req.body.table =="Entreprises")
  {
    connection.query('delete from Entreprises where idEntreprise=' + req.body.id, function(err, rows, fields) {
    if (err) throw err;
    console.log('SuppressionEntreprise', req.body);
    res.json({
      code:'200',
      message: 'suppression reussi',
    });
    });
  }
  else if(req.body.table =="Information")
  {
    connection.query('delete from Information where idInformation=' + req.body.id, function(err, rows, fields) {
      if (err) throw err;
      console.log('SuppressionInformation', req.body);
      res.json({
        code:'200',
        message: 'suppression reussi',
      });
    });
  }
  else if(req.body.table =="Annonces")
  {
    connection.query('delete from Annonces where idAnnonce=' + req.body.id, function(err, rows, fields) {
      if (err) throw err;
      console.log('SuppressionAnnonces', req.body);
      res.json({
        code:'200',
        message: 'suppression reussi',
      });
    });
  }
  
});

//Ajout de valeur dans une table
app.post('/addLine/:nomTable', function(req, res) {

  // let uniqueId=String(new Date().getTime()-1601457047002);
  // let currentDate = new Date().getFullYear().toString()+"-"+new Date().getMonth()+"-"+new Date().getDay()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds();
  console.log(req.body)
  
    let sql = "INSERT INTO " + req.params.nomTable + " ";
  // // let nomIdTable = ('id' + req.params.nomTable).slice(0,-1);

      sql += '('

      for (const prop in req.body) {
        sql += '' + prop + ', ';
      }

      sql = sql.slice(0,-2);
      sql += ') VALUES('

      for (const prop in req.body) {
          sql += '"' + req.body[prop] + '", ';
      }

      sql = sql.slice(0,-2);
      sql += ')';

      console.log(sql)

  connection.query(sql, function(err, rows) {
    if(!err)
      res.json({
        code:'200',
        message: 'Mise a jour effectuer',
      });
    else {
        res.json({
          code:'400',
          message: 'La mise a jour n\'a pu etre effectuer',
        });

    }
  });
});

app.put('/modifier', (req, res, next) => {
  console.log(req.body)

  let sql =' set '

  for(const prop in req.body)
  {
    console.log(req.body[prop])

    if(prop == "date")
    {
      // sql += prop +'="STR_TO_DATE('+ req.body[prop] + ')", '
      console.log("modification date non prise en Charge") /* @todo ajouter la prise en charge de la date */
    }
    else if(prop == "token")
    {
      if(req.body[prop] != "null")
      {
        sql += prop +'="'+ req.body[prop] + '", '
      }
    }
    else if(req.body[prop] != "null" && prop != "table")
    {
      sql += prop +'="'+ req.body[prop] + '", '
    }
    
  }
  sql = sql.slice(0,-2);
  console.log(sql)

  if(req.body.table == "Personnes")
  {
      connection.query("update Personnes" + sql + ' where idPersonne=' + req.body.idPersonne, function(err, rows) {
        if (err) throw err;
        console.log('modification:', req.body);
      });

      res.json({
        code:'200',
        message: 'suppression reussi',
      });
  }
  else if(req.body.table =="Entreprises")
  {
    connection.query('update Entreprises'  + sql + ' where idEntreprise=' + req.body.idEntreprise, function(err, rows, fields) {
    if (err) throw err;
    console.log('SuppressionEntreprise', req.body);
    res.json({
      code:'200',
      message: 'suppression reussi',
    });
    });
  }
  else if(req.body.table =="Information")
  {
    connection.query('update Information '  + sql + ' where idInformation=' + req.body.idInformation, function(err, rows, fields) {
      if (err) throw err;
      console.log('SuppressionInformation', req.body);
      res.json({
        code:'200',
        message: 'suppression reussi',
      });
    });
  }
  else if(req.body.table =="Annonces")
  {
    connection.query('update Annonces '  + sql + ' where idAnnonce=' + req.body.idAnnonce, function(err, rows, fields) {
      if (err) throw err;
      console.log('SuppressionAnnonces', req.body);
      res.json({
        code:'200',
        message: 'suppression reussi',
      });
    });
  }

 
});

app.post('/add', (req, res, next) => {

  connection.query('SELECT EXISTS( select idPersonne from Personnes where mail = "'+ req.body.email.toLowerCase() +'" || telephone = "' + req.body.tel + '" ) AS Exist', function(err, rows, fields) {
      if(rows[0].Exist == "1")
      {
        console.log("update")
          //update
          connection.query('update Personnes set identifiant="' + req.body.userName + '" , motdepasse="' + req.body.password + '", nom="' + req.body.lastName.toLowerCase() + '",prenom="' + req.body.firstName.toLowerCase() + '",telephone="' + req.body.tel + '",sexe="' + req.body.gender + '" where mail="' + req.body.email.toLowerCase() +'"', function(err, rows, fields) {
            if (err) throw err;
            console.log('la personne existe deja: ');
            res.json({
              code:'200',
              message: 'personne mise à jour',
            });
          });
      }
      else
      {
        console.log("create")
          //create
          connection.query('insert into Personnes (nom,prenom,mail,telephone,sexe,identifiant,motdepasse) value ("'+ req.body.lastName.toLowerCase() +'","'+ req.body.firstName.toLowerCase() + '","'+ req.body.email.toLowerCase() + '","'+ req.body.tel +'","'+ req.body.gender +'","'+ req.body.userName +'","'+ req.body.password +'")', function(err, rows, fields) {
            if (err) throw err;

            console.log('ajout reussi');
            res.json({
              code:'200',
              message: 'ajout reussi',
            });
          });
      }
    })
});

module.exports = app;