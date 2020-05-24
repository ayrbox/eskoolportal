const {
  studentList,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../../handlers/students");

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
  },
  {
    path: "/api/students",
    method: "post",
    handler: createStudent,
    secure: true
  },
  {
    path: "/api/students/:id",
    method: "put",
    handler: updateStudent,
    secure: true
  },
  {
    path: "/api/students/:id",
    method: "delete",
    handler: deleteStudent,
    secure: true
  }
];
