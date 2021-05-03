import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { FiscalYear } from '~/database/entities/FiscalYear';

const handler = nextConnect();

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const fiscalYears = await FiscalYear.find();

  res.send(fiscalYears);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as FiscalYear;

  // TODO: validate before insert
  const newFiscalYear = await FiscalYear.create(data).save();
  res.send(newFiscalYear);
});

export default secureRoute(handler);
