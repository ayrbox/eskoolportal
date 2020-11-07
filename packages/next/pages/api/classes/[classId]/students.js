const { Student, Class, Section } = require("@eskoolportal/api/src/models");
const Op = require("sequelize").Op;

export default async function handler(req, res) {
  const { classId } = req.query;
  const students = await Student.findAll({
    include: [
      { model: Class, as: "class" },
      { model: Section, as: "section" },
    ],
    where: {
      classId,
    },
  });

  res.status(200).json(students);
}
