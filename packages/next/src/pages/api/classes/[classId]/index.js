const { Class } = require("@eskoolportal/api/src/models");

export default async function handler(req, res) {
  const { classId } = req.query;
  const classInfo = await Class.findByPk(classId);

  res.status(200).json(classInfo);
}
