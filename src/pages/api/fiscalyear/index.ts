import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { FiscalYear } from '~/database/entities/FiscalYear';

const handler = nextConnect();

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const fiscalYears = await FiscalYear.find();

  res.send(fiscalYears);
});

export default secureRoute(handler);
