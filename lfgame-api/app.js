const { port, onError, onListening } = require("./bin/www");

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const sessionsRouter = require('./routes/sessions');


app.set('port', port);

server.listen(port);
server.on('error', onError);
server.on('listening', () => onListening(server));

const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/games', gamesRouter(dbHelpers));
app.use('/api/sessions', sessionsRouter(io, dbHelpers));