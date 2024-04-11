
import { engine } from 'express-handlebars';
import express from 'express';
import * as path from 'path';  
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import {indexRouter} from './routes/routes.js';
import { corsMiddleware } from './middlewares/cors.js';

import { socketIO } from './controllers/socketio.js';

import handlebars from './lib/handlebars.js';


const app = express();
app.disable('x-powered-by'); 

//Settings
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
app.use('/css', express.static(path.join(__dirname + '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname + '../node_modules/bootstrap/dist/js')))

//Starting
var server = app.listen(app.get('port'), () => {
    console.log("Running on http://localhost:3000", app.get('port'));
  })
  