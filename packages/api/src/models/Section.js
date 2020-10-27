"use strict";

const { v4: uuidv4 } = require("uuid");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Section.init(
    {
      name: DataTypes.STRING,
      order: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Section",
      tableName: "sections"
    }
  );

  Section.beforeCreate(m => (m.id = uuidv4()));
  return Section;
};
