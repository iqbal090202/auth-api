const db = require('../models');

const User = db.user;
const Expiration = db.expiration;

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};

const findOneUser = (id, res) => {
  User.findByPk(id)
    .then((data) => {
      res.send({
        data,
        status: 'success',
        expired: false,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving user with code=${id}`,
      });
    });
};

exports.findByCode = (req, res) => {
  const { code } = req.params;

  Expiration.findByPk(code)
    .then((data) => {
      if (new Date() >= new Date(data.expired)) {
        res.send({
          status: 'success',
          expired: true,
        });
      } else findOneUser(data.userId, res);
    })
    .catch((err) => {
      res.send({
        message: `Error retrieving expiration with code=${code}`,
      });
    });
};
