const Time = require('./../models/Time');

const concluirPartida = require('./../functions/concluirPartida');
const addElemento = require('./../functions/addElemento');
const getPartida = require('./../functions/getPartida');
const polarizar = require('./../functions/polarizar');

const timesJson = require('./../samples/times.json');

const USAR_COLECAO_TIMES = false;

module.exports = {
  criarChaveamento: async (req, res) => {
    const qtd_times = Number(req.params.qtd_times);

    if (isNaN(qtd_times) || qtd_times < 1)
      return res.status(500).send('Quantidade de times inválida.');

    const impar = qtd_times % 2 !== 0;
    const qtd_truncada = parseInt(qtd_times / 2);
    const qtd_times_oeste = impar ? 1 + qtd_truncada : qtd_truncada;
    const qtd_times_leste = impar ?     qtd_truncada : qtd_truncada;
    
    const times = !USAR_COLECAO_TIMES ? timesJson : await Time.find();

    if (times.length < qtd_times)
      return res.status(500).send(`Não é possível criar o chaveamento pois há apenas `
        + `${times.length} times cadastrados.`);

    const timesOeste = polarizar(times, 'Oeste', qtd_times_oeste);
    const timesLeste = polarizar(times, 'Leste', qtd_times_leste);
    const perdedores = [];
    const partidas = [];

    const quantidadePartidasTotal = qtd_times - 1;

    while (perdedores.length !== quantidadePartidasTotal) {
      const quantidadePartidasRestantes = quantidadePartidasTotal - partidas.length;

      if (timesOeste.length > 1) {
        const partidaOeste = getPartida(timesOeste, quantidadePartidasRestantes);
        const [
          vencedorOeste,
          perdedorOeste,
          resultadoPartidaOeste
        ] = concluirPartida(partidaOeste);
        
        addElemento(timesOeste, vencedorOeste);
        perdedores.push(perdedorOeste);
        partidas.push(resultadoPartidaOeste);

      } else if (timesOeste.length === 1) {
        timesLeste.push(timesOeste.pop());
      }

      if (timesLeste.length > 1) {
        const partidaLeste = getPartida(timesLeste, quantidadePartidasRestantes);
        const [
          vencedorLeste,
          perdedorLeste,
          resultadoPartidaLeste
        ] = concluirPartida(partidaLeste);
        
        addElemento(timesLeste, vencedorLeste);
        perdedores.push(perdedorLeste);
        partidas.push(resultadoPartidaLeste);

      } else if (timesLeste.length === 1) {
        timesOeste.push(timesLeste.pop());
      }
    }

    const vencedor = qtd_times > 1 ? (timesOeste.pop() || timesLeste.pop()) : {};

    res.status(200).json({ vencedor, partidas });
  }
};