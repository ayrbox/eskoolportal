const { login } = require("../../handlers/auth");

module.exports = [
  {
    path: "/api/auth/login",
    method: "post",
    handler: login,
    secure: false
  }
];
