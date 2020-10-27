"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init(
    {
      name: DataTypes.STRING,
      dateOfBirth: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      contactNo: DataTypes.STRING,
      email: DataTypes.STRING,
      joinDate: DataTypes.DATE,
      rollno: DataTypes.INTEGER,
      referenceCode: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Student",
      tableName: "students"
    }
  );
  return Student;
};
