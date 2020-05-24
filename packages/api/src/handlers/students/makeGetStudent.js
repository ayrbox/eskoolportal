module.exports = ({ Student, Class, Section }) => {
  return function ({ params }, res) {
    const { id } = params;
    Student.findByPk(id, {
      include: [Class, Section]
    }).then(students => {
      res.json(students);
    });
  };
};
