import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { FiscalYear } from "@prisma/client";
import { secureRoute } from "~/lib/secureRoute";
import { fiscalYearSchema } from "~/lib/validations";
import prisma from "~/lib/prisma";

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const yearToUpdate = req.body as FiscalYear;

  await fiscalYearSchema.validate(yearToUpdate, { abortEarly: false });

  const yearUpdated = await prisma.fiscalYear.update({
    data: yearToUpdate,
    where: {
      id,
    },
  });

  res.send(yearUpdated);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  await prisma.fiscalYear.delete({ where: { id } });

  res.send({
    message: "Deleted",
  });
});

export default secureRoute(handler);
