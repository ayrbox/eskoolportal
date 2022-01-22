import axios from "axios";
import { NextApiHandler } from "next";
import nextConnect from "next-connect";
import { secureRoute } from "~/lib/secureRoute";
import renderEvaluationSheet from "~/utils/pdf/renderEvaluationSheet";
import prisma from "~/lib/prisma";

const printMarksEvaluationSheet: NextApiHandler = async (req, res) => {
  const examId = req.query.examId as string | null;
  const classGroupId = req.query.classGroupId as string | null;
  const sectionId = req.query.sectionId as string | null;

  if (!examId) return res.status(400).send({ message: "Exam Id is required." });

  if (!classGroupId)
    return res.status(400).send({ message: "Class Id is required." });

  if (!sectionId)
    return res.status(400).send({ message: "Section Id is required." });

  const studentsWithObtainedMarks = await prisma.student.findMany({
    where: {
      classGroupId,
      sectionId,
    },
    include: {
      obtainedMarks: {
        where: {
          examId,
        },
        include: {
          subject: {
            select: {
              name: true,
            },
          },
          classGroup: {
            select: {
              name: true,
            },
          },
          section: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  try {
    const html = await renderEvaluationSheet(studentsWithObtainedMarks);
    const stream = await axios({
      url: "http://localhost:3080/pdf/test.pdf",
      method: "POST",
      data: html,
      headers: {
        "Content-Type": "text/html",
      },
      responseType: "stream",
    });
    stream.data.pipe(res);
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send({ message: "Error" });
  }
};

const handler = nextConnect().get(printMarksEvaluationSheet);

export default secureRoute(handler);
