import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { Grade } from '~/database/entities/Grades';
import { FiscalYear } from '~/database/entities/FiscalYear';
import { Exam } from '~/database/entities/Exam';
import { Class } from '~/database/entities/Class';
import { Subject } from '~/database/entities/Subject';

const handler = nextConnect();

type getParams = {
  yearId: string;
  examId: string;
  classId: string;
  subjectId: string;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const gradeId = req.query.gradeId as string;
  const grade = await Grade.findOne(gradeId);

  if (!grade) {
    return res.status(404).send({ message: 'Grade not found.' });
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
  } & Pick<Grade, 'gradeType' | 'fullMark' | 'passMark'>;

  const year = await FiscalYear.findOne(grade.yearId);
  const exam = await Exam.findOne(grade.examId);
  const clazz = await Class.findOne(grade.classId);
  const subject = await Subject.findOne(grade.subjectId);

  if (!year || !exam || !clazz || !subject) {
    return res
      .status(400)
      .send(
        'Please check year, exam, class and subject. Unable to create grade.'
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

  await Grade.update({ id: gradeId }, gradeToUpdate);
  res.send({
    message: 'Grade updated successfully.',
    grade: { id: gradeId, ...gradeToUpdate },
  });
});

export default secureRoute(handler);
