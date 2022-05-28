const fases_sucessivas = require('./../config/fases_sucessivas.json');
const parseVetorNumerico = require('./parseVetorNumerico');

module.exports = (times, quantidadePartidasRestantes) => {
  const primeiro_time = times.shift();
  const segundo_time = times.pop();
  
  const indices = parseVetorNumerico(Object.keys(fases_sucessivas));
  const booleanos = indices.map((indice) => quantidadePartidasRestantes <= indice);
  const indiceVetor = booleanos.indexOf(true);
  const indiceFaseSucessiva = indices[indiceVetor];
  const fase_sucessiva = fases_sucessivas[`${indiceFaseSucessiva}`];

  const partida = {
    fase_sucessiva,
    primeiro_time,
    segundo_time,
    pontos_primeiro_time: 0,
    pontos_segundo_time: 0,
  };

  return partida;
}