import { NextApiRequest, NextApiResponse } from "next";
import { secureRoute } from "~/lib/secureRoute";
import nextConnect from "next-connect";
import { FiscalYear } from "~/database/entities/FiscalYear";
import { fiscalYearSchema } from "~/lib/validations";

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const yearToUpdate = req.body as FiscalYear;

  await fiscalYearSchema.validate(yearToUpdate, { abortEarly: false });

  const yearUpdated = await FiscalYear.update(id, yearToUpdate);

  res.send(yearUpdated);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  (await FiscalYear.findOne(id)).softRemove();
  res.send({
    message: "Deleted",
  });
});

export default secureRoute(handler);
