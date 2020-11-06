const config = require('config');

module.exports = {
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.name'),
  host: config.get('db.host'),
  port: config.get('db.port'),
  dialect: 'postgres',
  logging: false,
};
