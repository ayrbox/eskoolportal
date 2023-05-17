import nextConnect from "next-connect";
import { NextApiHandler } from "next";
import { secureRoute } from "~/lib/secureRoute";
import { examNameSchema } from "~/lib/validations";
import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";

const updateHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const examToUpdate = req.body as Prisma.ExamNameUpdateArgs;

  await examNameSchema.validate(examToUpdate, { abortEarly: false });
  const examUpdated = await prisma.examName.update({
    data: examToUpdate,
    where: { id },
  });

  res.send(examUpdated);
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  await prisma.examName.delete({ where: { id } });

  res.send({
    message: "Deleted",
  });
};

const handler = nextConnect().put(updateHandler).delete(deleteHandler);

export default secureRoute(handler);
