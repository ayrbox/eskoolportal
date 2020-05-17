const Sequelize = require('sequelize');

module.exports = connection => {
  return connection.define('user', {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Data Error: Email can not be null',
        },
        isEmail: true,
      },
    },
    avatar: {
      type: Sequelize.STRING,
    },
  });
};
