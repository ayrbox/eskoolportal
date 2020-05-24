/**
 * Exports a function that takes connection as paramenters
 * Loads all the models and map associations and returns the model instances
 *
 */

require("dotenv").config();

const Sequelize = require("sequelize");
const UserModel = require("./User");
const StudentModel = require("./Student");
const ClassModel = require("./Class");
const SectionModel = require("./Section");

const { DB_HOST, DB, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const connection = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT
});

const User = UserModel(connection);
const Student = StudentModel(connection);
const Class = ClassModel(connection);
const Section = SectionModel(connection);

Student.belongsTo(Class, {
  foreignKey: { name: "classId", allowNull: false }
});

Class.hasMany(Student, {
  foreignKey: {
    name: "classId",
    allowNull: false
  }
});

Student.belongsTo(Section, {
  foreignKey: {
    name: "sectionId",
    allowNull: false
  }
});

Section.hasMany(Student, {
  foreignKey: {
    name: "sectionId",
    allowNull: false
  }
});

module.exports = {
  User,
  Student,
  Class,
  Section,
  Connection: connection
};
