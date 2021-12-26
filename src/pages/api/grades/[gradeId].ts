import { NextApiRequest, NextApiResponse } from "next";
import { secureRoute } from "~/lib/secureRoute";
import nextConnect from "next-connect";

import prisma from "~/lib/prisma";

type Grade = any;

const handler = nextConnect();

type getParams = {
  yearId: string;
  examId: string;
  classId: string;
  subjectId: string;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const gradeId = req.query.gradeId as string;
  // const grade = await Grade.findOne(gradeId);
  const grade = undefined;

  if (!grade) {
    return res.status(404).send({ message: "Grade not found." });
  }

  res.send(grade);
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const gradeId = req.query.gradeId as string;
  const grade = req.body as {
    yearId: string;
    examId: string;
    classId: string;
    subjectId: string;
  } & Pick<Grade, "gradeType" | "fullMark" | "passMark">;

  const year = await prisma.fiscalYear.findUnique({
    where: { id: grade.yearId },
  });
  const exam = await prisma.exam.findUnique({
    where: { id: grade.examId },
  });
  const clazz = await prisma.classGroup.findUnique({
    where: { id: grade.classId },
  });
  const subject = await prisma.subject.findUnique({
    where: { id: grade.subjectId },
  });

  if (!year || !exam || !clazz || !subject) {
    return res
      .status(400)
      .send(
        "Please check year, exam, class and subject. Unable to create grade."
      );
  }

  const gradeToUpdate = {
    year,
    exam,
    class: clazz,
    subject,
    gradeType: grade.gradeType,
    fullMark: grade.fullMark,
    passMark: grade.passMark,
  };

  // await Grade.update({ id: gradeId }, gradeToUpdate);
  res.send({
    message: "Grade updated successfully.",
    grade: { id: gradeId, ...gradeToUpdate },
  });
});

export default secureRoute(handler);
