import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "~/lib/prisma";
import { secureRoute } from "~/lib/secureRoute";

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const exams = await prisma.exam.findMany({
    include: {
      fiscalYear: true,
    },
  });
  res.send(exams);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const exam = req.body as Prisma.ExamCreateInput;

    // TODO: Validate

    const examCreated = await prisma.exam.create({
      data: exam,
    });
    res.status(201).send(examCreated);
  } catch (err) {
    console.log(err);
    res.status(500).send("hello");
  }
});

export default secureRoute(handler);
