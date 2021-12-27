import { Prisma } from "@prisma/client";
import { NextApiHandler } from "next";
import nextConnect from "next-connect";
import prisma from "~/lib/prisma";
import { secureRoute } from "~/lib/secureRoute";

const updateExamHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  const examToUpdate = req.body as Prisma.ExamUpdateInput;

  // TODO: validate body
  const examUpdated = await prisma.exam.update({
    data: examToUpdate,
    where: { id },
  });

  res.send(examUpdated);
};

const deleteExamHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  await prisma.exam.delete({ where: { id } });

  res.send({
    message: "Deleted",
  });
};

const handler = nextConnect().put(updateExamHandler).delete(deleteExamHandler);

export default secureRoute(handler);
