const { Student, Class, Section } = require("@eskoolportal/api/src/models");

export default async function handler(req, res) {
  const students = await Student.findAll({
    include: [
      { model: Class, as: "class" },
      { model: Section, as: "section" },
    ],
  });

  res.status(200).json(students);
}
