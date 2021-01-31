import { Section } from '@eskoolportal/core/lib/entities/Section';
import { withAuthentication } from '~/lib/withAuthentication';

export default withAuthentication(async function handler(req, res) {
  const sections = await Section.find();

  res.status(200).json(sections);
});
