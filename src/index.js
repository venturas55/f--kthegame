
import { engine } from 'express-handlebars';
import express from 'express';
import * as path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { Server as WebSocketServer } from "socket.io";
import http from 'http';

import { indexRouter } from './routes/routes.js';
import { corsMiddleware } from './middlewares/cors.js';
import funciones from './lib/funciones.js';
import handlebars from './lib/handlebars.js';



const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server);

//Settings
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({  //con esto se configura el app.engine
  defaultLayout: 'main',
  layoutDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: handlebars
}));
app.set('view engine', '.hbs'); //Para utilizar el app.engine

//Middleware
app.use(express.json()); //Para enviar y recibir jsons.
app.use(corsMiddleware());

//Routes
app.use(indexRouter); //busca automaticamente el archivo index.js

//Public
app.use(express.static(path.join(__dirname, 'public')));




// LOGICA  DEL JUEGO
const bgColors = ["azul", "rojo", "naranja", "verde", "amarillo", "violeta"];
const textColors = ["azul", "rojo", "naranja", "verde", "amarillo", "negro"];
const texts = ["azul", "rojo", "naranja", "verde", "amarillo", "negro", "violeta", "puta", "mierda", "polla", "coño", "cabron", "joder"];
var shownCards = [];
var cartas = funciones.generateUniquePermutations([bgColors, textColors, texts]);
cartas = funciones.shuffleArray(cartas);
var jugadores = [];
var numConexiones = 0;


io.on('connection', (socket) => {
  numConexiones++;
  console.log('connection:', socket.id, "jugadores totales:", numConexiones);

  socket.on('nextCard', (socket) => {
    const [nextCard] = funciones.nextCard(cartas);
    shownCards.push(nextCard);
    console.log('Envio carta:', nextCard,"quedan",cartas.length);
    io.emit('nextCardSentFromServer', nextCard);
  });

  socket.on('playerReady', () => {
    console.log('Player ready:',socket.id);
    jugadores.push(socket);
    console.log('Jugadores listos:',jugadores.length);
  });

});

/* io.on("disconnect", (reason) => {
  numConexiones--;
  console.log('connection:', reason, "jugadores totales:", numConexiones);
}); */

//Starting
server.listen(app.get('port'), () => {
  console.log("Running on http://localhost:3000", app.get('port'));
});