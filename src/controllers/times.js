const Time = require('./../models/Time');

module.exports = {
  adicionarTime: (req, res) => {
    const { lado, numero_ordinario, url_logotipo, nome } = req.body;

    const time = { lado, numero_ordinario, url_logotipo, nome, numero_vitorias: 0 };
    
    Time.create(time, (error, result) => {
      if (error) {
        return res.status(500).send('Não foi possível cadastrar o time.');
      }

      res.status(201).send('Time cadastrado com sucesso.');
    });
  },

  adicionarVariosTimes: (req, res) => {
    for (const { lado, numero_ordinario, url_logotipo, nome } of req.body) {
      const time = { lado, numero_ordinario, url_logotipo, nome, numero_vitorias: 0 };
      Time.create(time);
    }

    res.status(201).send('Times cadastrados com sucesso.');
  },

  buscarTimes: async (req, res) => {
    const times = await Time.find();
    res.status(200).json(times);
  },

  atualizarTime: (req, res) => {
    const { id } = req.params;
    const { lado, numero_ordinario, url_logotipo, nome, numero_vitorias } = req.body;
    const update = { lado, numero_ordinario, url_logotipo, nome, numero_vitorias };

    Time.updateOne({ _id: id }, update, null, (error, result) => {
      if (error) {
        return res.status(500).send('Não foi possível atualizar o time.');
      }

      res.status(204).send('Time atualizado com sucesso.');
    });
  },

  truncarTimes: (req, res) => {
    Time.deleteMany({}, null, (error) => {
      if (error) {
        return res.status(500).send('Não foi deletar nenhum time.');
      }

      res.status(204).send('Times deletados com sucesso.');
    });
  },

  deletarTime: (req, res) => {
    const { id } = req.params;

    Time.deleteOne({ _id: id }, null, (error, result) => {
      if (error) {
        return res.status(500).send('Não foi possível deletar o time.');
      }

      res.status(204).send('Time deletado com sucesso.');
    });
  }
};