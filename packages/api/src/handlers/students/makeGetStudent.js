module.exports = ({ Student, Class, Section }) => {
  return function (req, res) {
    const { params } = req;
    Student.findByPk(params.id, {
      include: [Class, Section],
    }).then(students => {
      res.json(students);
    });
  };
};
