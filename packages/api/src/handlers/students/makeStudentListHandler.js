module.exports = ({ Student, Class, Section }) => {
  return function (_, res) {
    Student.findAll({
      include: [Class, Section],
    }).then(students => {
      res.json(students);
    });
  };
};
