import { NextApiHandler } from "next";
import nextConnect from "next-connect";
import prisma from "~/lib/prisma";
import { secureRoute } from "~/lib/secureRoute";
import { ObtainedMarksQueryParams, StudentMarksPayload } from "~/types/Marks";

const getStudentMarks: NextApiHandler = async (req, res) => {
  const studentCode = req.query.code as string | null;

  const examId = req.query.examId as string | null;
  const subjectId = req.query.subjectId as string | null;

  const classGroupId = req.query.classGroupId as string | null;
  const sectionId = req.query.sectionId as string | null;

  if (!studentCode)
    return res.status(400).send({ message: "Student code is missing." });

  if (!examId) return res.status(400).send({ message: "Exam Id is required." });

  if (!subjectId)
    return res.status(400).send({ message: "Subject Id is required." });

  if (!classGroupId)
    return res.status(400).send({ message: "Class Id is required." });

  if (!sectionId)
    return res.status(400).send({ message: "Section Id is required." });

  // lets see what I need to do
  // find a student (if does not exits send back 404)
  const studentWithObtainedMarks = await prisma.student.findFirst({
    where: { referenceCode: studentCode },
    include: {
      ClassGroup: true,
      Section: true,
      obtainedMarks: {
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

  const obtainedMarks = await prisma.obtainedMarks.findFirst({
    where: {
      examId,
      subjectId,
      classGroupId,
      sectionId,
      fullMark: { gt: 0 },
      passMark: { gt: 0 },
    },
  });

  // get marks obtains by student for the exam selected and the subject then return
  res.send({
    ...studentWithObtainedMarks,
    fullMark: obtainedMarks?.fullMark || 0,
    passMark: obtainedMarks?.passMark || 0,
  });
};

/*
 * POST (Create) obtained marks
 */
const upsertObtainedMarks: NextApiHandler = async (req, res) => {
  const studentCode = req.query.code as string | null;
  if (!studentCode)
    return res.status(400).send({ message: "Student code is missing." });

  // TODO: Validate payload with `yup`
  const payload = req.body as Required<StudentMarksPayload>;

  const student = await prisma.student.findFirst({
    where: { referenceCode: studentCode },
    include: {
      ClassGroup: true,
      Section: true,
      obtainedMarks: {
        where: {
          examId: payload.examId,
          subjectId: payload.subjectId,
          examType: payload.examType || null,
        },
      },
    },
  });

  if (!student) {
    return res.status(404).send({ message: "Unable to find student." });
  }
  // Match classGroup and section for student ( send 400 if it does not matchs)
  if (
    !(
      student.classGroupId === payload.classGroupId &&
      student.sectionId === payload.sectionId
    )
  ) {
    return res.status(400).send({
      message: "Student not found in the class and section selected.",
    });
  }

  const [studentObtainedMarks] = student.obtainedMarks;

  // if student marks already exits then update else create
  await prisma.obtainedMarks.upsert({
    create: {
      studentId: student.id,
      examId: payload.examId,
      classGroupId: payload.classGroupId,
      sectionId: payload.sectionId,
      subjectId: payload.subjectId,
      examType: payload.examType,
      fullMark: Number(payload.marks.fullMark),
      passMark: Number(payload.marks.passMark),
      obtainedMarks: Number(payload.marks.obtainedMarks),
    },
    update: {
      fullMark: Number(payload.marks.fullMark),
      passMark: Number(payload.marks.passMark),
      obtainedMarks: Number(payload.marks.obtainedMarks),
    },
    where: { id: studentObtainedMarks?.id || "-" },
  });

  res.send({
    message: "Obtained marks created.",
  });
};

const handler = nextConnect().get(getStudentMarks).post(upsertObtainedMarks);

export default secureRoute(handler);
