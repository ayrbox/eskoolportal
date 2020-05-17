const { studentList, getStudent } = require('../../handlers/students');

module.exports = [
  {
    path: '/students',
    method: 'get',
    handler: studentList,
    secure: true,
  },
  {
    path: '/student/:id',
    method: 'get',
    handler: getStudent,
    secure: true,
  },
];
