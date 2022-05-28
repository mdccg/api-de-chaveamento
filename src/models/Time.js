const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  lado: {
    required: true,
    type: String,
    enum: ['Leste', 'Oeste']
  },
  numero_ordinario: {
    required: true,
    type: Number,
  },
  url_logotipo: {
    type: String
  },
  nome: {
    required: true,
    type: String
  },
  numero_vitorias: {
    required: true,
    type: Number,
    default: 0
  },
});

const model = mongoose.model('Time', timeSchema, 'times');

module.exports = model;