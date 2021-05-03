import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { FiscalYear } from '~/database/entities/FiscalYear';

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const yearToUpdate = req.body as FiscalYear;

  // TODO: validate before insert
  const yearUpdated = await FiscalYear.update(id, yearToUpdate);

  res.send(yearUpdated);
});

export default secureRoute(handler);
