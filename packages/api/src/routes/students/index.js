const { studentList, getStudent } = require("../../handlers/students");

module.exports = [
  {
    path: "/api/students",
    method: "get",
    handler: studentList,
    secure: true
  },
  {
    path: "/api/student/:id",
    method: "get",
    handler: getStudent,
    secure: true
  }
];
