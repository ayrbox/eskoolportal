import { secureRoute } from "~/lib/secureRoute";
import nextConnect from "next-connect";
import { ValidationError } from "yup";
import { NextApiRequest, NextApiResponse } from "next";
import { studentSchema } from "~/lib/validations";
import prisma from "~/lib/prisma";
import { Prisma } from "@prisma/client";

const handler = nextConnect();

// TODO: repository and validate inside core
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const studentData = req.body as Prisma.StudentUncheckedCreateInput;

    await studentSchema.validate(studentData, { abortEarly: false });

    const studentCreated = await prisma.student.create({
      data: studentData,
    });
    return res.status(201).json(studentCreated);
  } catch (validationError) {
    if (validationError instanceof ValidationError) {
      return res.status(400).json({
        message: "Invalid Student information",
        error: validationError.errors,
      });
    } else {
      //TODO: bunyan log here
      console.log(validationError);
      return res.status(500).json({ message: "Unexpected error." });
    }
  }
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query.q as string;

  if (!q) {
    res.status(200).send([]);
    return;
  }

  const result = await prisma.student.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    take: 10,
    include: {
      Class: true,
      Section: true,
    },
  });

  res.status(200).send(result);
});

export default secureRoute(handler);
