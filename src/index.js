const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('./database');

const roteadorTimes = require('./routes/times');
const roteadorPartidas = require('./routes/partidas');

const app = express();
const porta = 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors({}));

app.use('/api/v1/times', roteadorTimes);
app.use('/api/v1/partidas', roteadorPartidas);

app.listen(porta, () => {
  console.log('O servidor está rodando na porta ' + porta + '.');
});