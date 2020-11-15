const { Class } = require("@eskoolportal/api/src/models");

export default async function handler(req, res) {
  const classes = await Class.findAll();

  res.status(200).json(classes);
}
