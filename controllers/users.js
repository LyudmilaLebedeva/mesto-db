/* eslint-disable no-unused-vars */
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'Данные не корректны' }));
};

module.exports.getUsers = (req, res) => {
  User.find({ })
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
        return;
      }
      res.send({ message: user });
    })
    .catch((err) => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};
