module.exports = (sequelize, Sequelize) => {
  const Expiration = sequelize.define('expirations', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    expired: {
      type: Sequelize.DATE,
    },
  });

  return Expiration;
};
