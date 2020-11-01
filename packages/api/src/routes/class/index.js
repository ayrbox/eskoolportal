const { classList, getClassHandler } = require("../../handlers/class");

module.exports = [
  {
    path: "/api/classes",
    method: "get",
    handler: classList,
    secure: true
  },
  {
    path: "/api/classes/:id",
    method: "get",
    handler: getClassHandler,
    secure: true
  }
];
