const express = require('express');
const router = express.Router();
const controller = require('./../controllers/partidas');

router.post('/criar-chaveamento/:qtd_times', controller.criarChaveamento);

module.exports = router;