import { NextApiResponse } from 'next';
import { Section } from '~/database/entities/Section';
import { secureRoute } from '~/lib/secureRoute';
export default secureRoute(async function handler(_, res: NextApiResponse) {
  const sections = await Section.find();

  res.status(200).json(sections);
});
