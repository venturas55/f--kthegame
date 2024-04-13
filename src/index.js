
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
var cartas = [];
var turno = 0;
var jugadores = [];
var numConexiones = 0;
var partidas = [];

function nextPlayer() {
  //variables globales del index.js   jugadores y turno
  turno++;
  if (turno == jugadores.length) {
      turno = 0;
  }
}


io.on('connection', (socket) => {
  numConexiones++;
  console.log('connection:', socket.id, "Conexiones totales:", numConexiones);

  socket.on('nextCard', (socket) => {
    const [nextCard] = funciones.nextCard(cartas);
    shownCards.push(nextCard);
    console.log('Envio carta:', nextCard, "quedan", cartas.length);
    io.emit('nextCardSentFromServer', nextCard);
  });

  socket.on('CreateGame', () => {
    console.log('Create Game:', socket.id);
    var game = { creator_id: socket.id, gameCode: Math.random().toString(16).slice(9) }
    console.log(game.gameCode);
    partidas.push(game);
  });

  socket.on('playerReady', () => {
    console.log('Player ready:', socket.id);
    jugadores.push(socket);
    console.log('Jugadores listos:', jugadores.length);
  });

  socket.on('startGame', () => {
    console.log('Player who started:', socket.id);
    console.log('Jugadores en la partida:', jugadores.length);
    cartas = funciones.generateUniquePermutations([bgColors, textColors, texts]);
    cartas = funciones.shuffleArray(cartas);
    //TODO: Division exacta en funcion del numero de players. COMO HAY MUCHAS CARTAS REPARTO 20 A CADA JUGADOR DIRECTAMENTE. //TODO:
    jugadores.forEach(player => {
      io.to(player.id).emit("ServerSendCards", cartas.splice(0, 20));
    });
    io.to(jugadores[turno].id).emit("suTurno");
  });

  socket.on('playerPlayCard', (carta) => {
    shownCards.push(carta);
    nextPlayer();
    io.to(jugadores[turno].id).emit("suTurno");
    io.emit('nextCardSentFromServer', carta);
  });


});

//Starting
server.listen(app.get('port'), () => {
  console.log("Running on http://localhost:3000", app.get('port'));
});