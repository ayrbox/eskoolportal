import { NextApiHandler } from "next";
import nextConnect from "next-connect";
import prisma from "~/lib/prisma";
import { secureRoute } from "~/lib/secureRoute";

const getStudentMarks: NextApiHandler = async (req, res) => {
  const examId = req.query.examId as string | null;
  const subjectId = req.query.subjectId as string | null;

  const classGroupId = req.query.classGroupId as string | null;
  const sectionId = req.query.sectionId as string | null;
  const studentCode = req.query.studentCode as string | null;

  if (!examId) return res.status(400).send({ message: "Exam Id is required." });
  if (!subjectId)
    return res.status(400).send({ message: "Subject Id is required." });

  if (!classGroupId)
    return res.status(400).send({ message: "Class Id is required." });

  if (!sectionId)
    return res.status(400).send({ message: "Section Id is required." });

  if (!studentCode)
    return res.status(400).send({ message: "Student code is missing." });

  // lets see what I need to do
  // find a student (if does not exits send back 404)

  const studentWithObtainedMarks = await prisma.student.findFirst({
    where: { referenceCode: studentCode },
    include: {
      ClassGroup: true,
      Section: true,
      obtainMarks: {
        where: {
          examId,
          subjectId,
        },
      },
    },
  });

  if (!studentWithObtainedMarks) {
    return res.status(404).send({ message: "Unable to find student." });
  }
  // Match classGroup and section for student ( send 400 if it does not matchs)
  if (
    !(
      studentWithObtainedMarks.classGroupId === classGroupId &&
      studentWithObtainedMarks.sectionId === sectionId
    )
  ) {
    return res.status(400).send({
      message: "Student not found in the class and section selected.",
    });
  }

  const obtainMarks = await prisma.obtainMarks.findFirst({
    where: {
      examId,
      subjectId,
      classGroupId,
      fullMark: { gt: 0 },
      passMark: { gt: 0 },
    },
  });

  // get marks obtains by student for the exam selected and the subject then return
  res.send({
    ...studentWithObtainedMarks,
    fullMark: obtainMarks?.fullMark || 0,
    passMark: obtainMarks?.passMark || 0,
  });
};

const handler = nextConnect().get(getStudentMarks);

export default secureRoute(handler);
