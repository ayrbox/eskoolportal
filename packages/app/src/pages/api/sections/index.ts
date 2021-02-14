import { Section } from '@eskoolportal/core/lib/entities/Section';
import { secureRoute } from '~/lib/secureRoute';
export default secureRoute(async function handler(req, res) {
  const sections = await Section.find();

  res.status(200).json(sections);
});
