import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
// import { fiscalYearSchema } from '~/lib/validations';
import { Grade } from '~/database/entities/Grades';
import { FiscalYear } from '~/database/entities/FiscalYear';
import { Exam } from '~/database/entities/Exam';
import { Class } from '~/database/entities/Class';
import { Subject } from '~/database/entities/Subject';

const handler = nextConnect();

handler.get(async (_: NextApiRequest, res: NextApiResponse) => {
  const grades = await Grade.find();
  res.send(grades);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
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

  const gradeToCreate = {
    year,
    exam,
    class: clazz,
    subject,
    gradeType: grade.gradeType,
    fullMark: grade.fullMark,
    passMark: grade.passMark,
  };

  //   await fiscalYearSchema.validate(grade, { abortEarly: false });
  const gradeCreated = await Grade.create(gradeToCreate).save();
  res.send(gradeCreated);
});

export default secureRoute(handler);
