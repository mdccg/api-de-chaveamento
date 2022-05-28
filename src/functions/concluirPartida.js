const gerarNumeroAleatorio = require('./gerarNumeroAleatorio');

module.exports = (partida) => {
  const { primeiro_time, segundo_time } = partida;
  const pontos_primeiro_time = gerarNumeroAleatorio();
  const pontos_segundo_time  = gerarNumeroAleatorio();

  const vencedor = pontos_primeiro_time > pontos_segundo_time ? primeiro_time : segundo_time;
  const perdedor = pontos_primeiro_time > pontos_segundo_time ? segundo_time : primeiro_time;

  partida.pontos_primeiro_time = pontos_primeiro_time;
  partida.pontos_segundo_time  = pontos_segundo_time;
  
  ++vencedor.numero_vitorias;

  return [vencedor, perdedor, partida];
}