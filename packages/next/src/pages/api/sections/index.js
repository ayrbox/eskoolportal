import { Section } from '@eskoolportal/api/src/models';
import { withAuthentication } from '@lib/authenticate';

export default withAuthentication(async function handler(req, res) {
  const sections = await Section.findAll();

  res.status(200).json(sections);
});
