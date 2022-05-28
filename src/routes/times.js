const express = require('express');
const router = express.Router();
const controller = require('./../controllers/times');

router.post('/', controller.adicionarTime);
router.post('/varios', controller.adicionarVariosTimes);
router.get('/', controller.buscarTimes);
router.put('/:id', controller.atualizarTime);
router.delete('/varios', controller.truncarTimes);
router.delete('/:id', controller.deletarTime);

module.exports = router;