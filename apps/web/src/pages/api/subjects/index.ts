import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { secureRoute } from "~/lib/secureRoute";
import prisma from "~/lib/prisma";
import { Subject } from "@prisma/client";

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const subjects = await prisma.subject.findMany();
  res.status(200).json(subjects);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subject = req.body as Subject;
    await prisma.subject.create({ data: subject });
    res.status(204).end();
  } catch (err) {
    res.status(500).send({ message: "Unable to save subject." });
  }
});

export default secureRoute(handler);
