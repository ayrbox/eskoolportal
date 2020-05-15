const Sequelize = require('sequelize');

const HOST = 'localhost';
const DB = 'eskoolportal';
const DB_USER = 'eskuser';
const DB_PWD = 'eskpassword';
const PORT = 5466;

module.exports = new Sequelize(DB, DB_USER, DB_PWD, {
  dialect: 'postgres',
  host: HOST,
  port: PORT,
  logging: false,
});
