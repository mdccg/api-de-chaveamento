const mongoose = require('mongoose');

const uris = 'mongodb://localhost/banco';

mongoose.connect(uris)
  .catch(err => console.error(err));

mongoose.connection.on('connected', () => console.log('Banco de dados conectado.'));
mongoose.connection.on('disconnected', () => console.log('Banco de dados desconectado.'));
mongoose.connection.on('error', err => console.error(err));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Conexão com o banco de dados encerrada.');
    process.exit(0);
  });
});