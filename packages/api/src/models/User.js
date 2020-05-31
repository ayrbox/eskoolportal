const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = connection => {
  const User = connection.define(
    "user",
    {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Data Error: Email can not be null"
          },
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING
      }
    },
    {
      hooks: {
        beforeCreate: async user => {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  );

  User.prototype.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
