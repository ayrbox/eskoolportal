import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";
import { secureRoute } from "~/lib/secureRoute";
import { examNameSchema } from "~/lib/validations";
import prisma from "~/lib/prisma";
import { Prisma } from "@prisma/client";

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const exams = await prisma.examName.findMany();
  res.send(exams);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const exam = req.body as Prisma.ExamNameCreateInput;

  await examNameSchema.validate(exam, { abortEarly: false });
  const examCreated = await prisma.examName.create({
    data: exam,
  });
  res.status(201).send(examCreated);
});

export default secureRoute(handler);
