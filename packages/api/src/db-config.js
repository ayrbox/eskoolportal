const config = require("config");

module.exports = {
  username: config.get("db.user"),
  password: config.get("db.password"),
  database: config.get("db.name"),
  host: config.get("db.host"),
  dialect: "postgres",
  logging: false
};
