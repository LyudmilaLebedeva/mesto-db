const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owener: req.user._id })
    .then((card) => res.send(card))
    .catch(() => res.status(400).send({ message: 'Данные не корректны' }));
};

module.exports.getCards = (req, res) => {
  Card.find({ })
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ message: card });
    })
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
};
