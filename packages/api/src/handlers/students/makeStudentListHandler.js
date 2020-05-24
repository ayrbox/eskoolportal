const Op = require("sequelize").Op;

module.exports = ({ Student, Class, Section }) => {
  return function ({ query }, res) {
    const { class: classId, section: sectionId, name } = query;

    const clauses = {};

    if (classId) {
      clauses.classId = classId;
    }
    if (sectionId) {
      clauses.sectionId = sectionId;
    }

    if (name) {
      clauses.name = {
        [Op.iLike]: `%${name}%`
      };
    }

    Student.findAll({
      include: [Class, Section],
      where: clauses
    }).then(students => {
      res.json(students);
    });
  };
};
