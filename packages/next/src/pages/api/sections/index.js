const { Section } = require('@eskoolportal/api/src/models');

export default async function handler(req, res) {
  const sections = await Section.findAll();

  res.status(200).json(sections);
}
