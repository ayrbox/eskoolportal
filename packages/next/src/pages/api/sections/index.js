import { Section } from '@eskoolportal/api/src/models';
import authenticate from '@lib/authenticate';

export default authenticate(async function handler(req, res) {
  const sections = await Section.findAll();

  res.status(200).json(sections);
});
