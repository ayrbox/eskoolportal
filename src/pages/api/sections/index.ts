import { NextApiResponse } from "next";

import prisma from "~/lib/prisma";

import { secureRoute } from "~/lib/secureRoute";
export default secureRoute(async function handler(_, res: NextApiResponse) {
  const sections = await prisma.section.findMany();

  res.status(200).json(sections);
});
