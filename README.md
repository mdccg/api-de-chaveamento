# playoffs

- [playoffs](#playoffs)
  - [Motivação](#motivação)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Lista de afazeres](#lista-de-afazeres)

## Motivação

Este app consiste em um sistema de chaveamento esportivo.

Cada time armazena seu respectivo lado (oeste ou leste), o número ordinário referente ao lado (_e_._g_.: 1º time do oeste, 2º time do leste _etc_.), o link da logotipo do time (o qual é   opcional), o nome do time e o número de vitórias do time. O app faz conexão com o [banco de dados](./src/database/index.js) local e puxa todos os times cadastrados nele para a função [`criarChaveamento`](./src/controllers/partidas.js), que é invocada através do _endpoint_ [`/criar-chaveamento/:qtd_times`](./src/routes/partidas.js). Caso não haja nenhum time cadastrado no banco de dados, há a constante `USAR_COLECAO_TIMES` no _controller_ das partidas. A constante pode ser usada para dispensar o banco de dados e utilizar em vez dele o arquivo [`times.json`](./src/samples/times.json), com dezesseis times pré-definidos.

O _endpoint_ `/criar-chaveamento/:qtd_times` recebe como argumento a quantidade de times da competição em questão. O número ordinário presente no modelo de dados dos times faz com que os primeiros times tenham preferência para competir em caso da quantidade de times informada for inferior a dezesseis. O código lança uma exceção caso seja informada uma quantidade de times superior ao número de times disponíveis e o número máximo de times é 255, como exemplificado no arquivo [`fases_sucessivas.json`](./src/config/fases_sucessivas.json).

## Pilha de tecnologia

| Papel | Tecnologia |
|-|-|
| Ambiente de execução | [Node](https://nodejs.org/en/) |
| Linguagem de programação | [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) |
| Back-end | [Express.js](https://expressjs.com/pt-br/) |
| Banco de dados | [MongoDB](https://www.mongodb.com/) |

## Lista de afazeres

- [ ] Computar um empate criando mais uma partida;
- [ ] Criar _model_ e _controllers_ para uma partida;
- [ ] Criar _model_ e _controllers_ para um jogo.