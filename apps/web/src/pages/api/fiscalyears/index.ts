import { NextApiRequest, NextApiResponse } from "next";
import { secureRoute } from "~/lib/secureRoute";
import nextConnect from "next-connect";
import { fiscalYearSchema } from "~/lib/validations";
import prisma from "~/lib/prisma";
import type { FiscalYear } from "@prisma/client";

const handler = nextConnect();

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const fiscalYears = await prisma.fiscalYear.findMany();

  res.send(fiscalYears);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const yearData = req.body as FiscalYear;

  await fiscalYearSchema.validate(yearData, { abortEarly: false });
  const newFiscalYear = await prisma.fiscalYear.create({
    data: yearData,
  });
  res.send(newFiscalYear);
});

export default secureRoute(handler);
