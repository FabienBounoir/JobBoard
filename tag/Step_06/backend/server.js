const http = require('http');

//fichier qui contient le CRUD
const app = require('./app');

//le server ecoute le port 8080
app.set('port', process.env.PORT || 8080);
const server = http.createServer(app);

server.listen(process.env.PORT || 8080);
