module.exports = (times, lado, qtd_times) =>
  times.filter(time => time.lado === lado).splice(0, qtd_times);