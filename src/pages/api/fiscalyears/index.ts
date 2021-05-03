import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { FiscalYear } from '~/database/entities/FiscalYear';
import { fiscalYearSchema } from '~/lib/validations';

const handler = nextConnect();

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const fiscalYears = await FiscalYear.find();

  res.send(fiscalYears);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const yearData = req.body as FiscalYear;

  await fiscalYearSchema.validate(yearData, { abortEarly: false });
  const newFiscalYear = await FiscalYear.create(yearData).save();
  res.send(newFiscalYear);
});

export default secureRoute(handler);
