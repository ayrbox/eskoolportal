import { NextApiHandler } from "next";
import nextConnect from "next-connect";
import prisma from "~/lib/prisma";
import { secureRoute } from "~/lib/secureRoute";

const getStudentMarks: NextApiHandler = async (req, res) => {
  const examId = req.query.examId as string | null;
  const subjectId = req.query.subjectId as string | null;

  const classGroupId = req.query.classGroupId as string | null;
  const sectionId = req.query.sectionId as string | null;
  const examType = req.query.examType as string | null;

  if (!examId) return res.status(400).send({ message: "Exam Id is required." });
  if (!subjectId)
    return res.status(400).send({ message: "Subject Id is required." });

  if (!classGroupId)
    return res.status(400).send({ message: "Class Id is required." });

  if (!sectionId)
    return res.status(400).send({ message: "Section Id is required." });

  const obtainedMarks = await prisma.obtainedMarks.findMany({
    where: {
      examId,
      subjectId,
      classGroupId,
      sectionId,
      examType: examType || undefined,
    },
    include: {
      student: true,
    },
  });

  res.send(obtainedMarks);
};

const handler = nextConnect().get(getStudentMarks);

export default secureRoute(handler);
