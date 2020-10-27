"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users"
    }
  );

  User.beforeCreate(user => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
    user.id = uuidv4();
  });

  User.prototype.isPasswordValid = async password => {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
