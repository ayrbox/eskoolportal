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
};

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { yearId, examId, classId } = req.query as getParams;

  if (!yearId || !examId || !classId) {
    return res.send([]);
  }

  const year = await prisma.fiscalYear.findUnique({ where: { id: yearId } });
  const exam = await prisma.exam.findUnique({ where: { id: examId } });
  const clazz = await prisma.classGroup.findUnique({ where: { id: classId } });

  // const grades = await Grade.find({ year, exam, class: clazz, });
  res.send([]);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const grade = req.body as {
    yearId: string;
    examId: string;
    classId: string;
    subjectId: string;
  } & Pick<Grade, "gradeType" | "fullMark" | "passMark">;

  const year = await prisma.fiscalYear.findUnique({
    where: { id: grade.yearId },
  });
  const exam = await prisma.exam.findUnique({ where: { id: grade.examId } });
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

  // const [gradeFound] = await Grade.find({ year, exam, class: clazz, subject, gradeType: grade.gradeType, });
  const gradeFound = undefined;

  if (gradeFound) {
    return res
      .status(400)
      .send({ message: "Grade already created for the subject" });
  }

  const gradeToCreate = {
    year,
    exam,
    class: clazz,
    subject,
    gradeType: grade.gradeType,
    fullMark: grade.fullMark,
    passMark: grade.passMark,
  };

  // const result = await Grade.create(gradeToCreate).save();
  res.send({ message: "Grade created successfully.", grade: null });
});

export default secureRoute(handler);
