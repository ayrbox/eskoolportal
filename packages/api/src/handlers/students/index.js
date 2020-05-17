const { Student, Class, Section } = require('../../models');

const makeStudentListHandler = require('./makeStudentListHandler');
const makeGetStudent = require('./makeGetStudent');

const studentList = makeStudentListHandler({ Student, Class, Section });

const getStudent = makeGetStudent({ Student, Class, Section });

module.exports = {
  studentList,
  getStudent,
};
