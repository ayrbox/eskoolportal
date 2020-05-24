const { Student, Class, Section } = require("../../models");

const makeStudentListHandler = require("./makeStudentListHandler");
const makeGetStudent = require("./makeGetStudent");
const makeCreateStudent = require("./makeCreateStudent");
const makeUpdateStudent = require("./makeUpdateStudent");
const makeDeleteStudent = require("./makeDeleteStudent");

const studentList = makeStudentListHandler({ Student, Class, Section });

const getStudent = makeGetStudent({ Student, Class, Section });
const createStudent = makeCreateStudent({ Student });
const updateStudent = makeUpdateStudent({ Student });
const deleteStudent = makeDeleteStudent({ Student });

module.exports = {
  studentList,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
};
