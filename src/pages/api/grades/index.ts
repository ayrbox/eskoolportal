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

type getParams = {
  yearId: string;
  examId: string;
  classId: string;
  subjectId: string;
};

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { yearId, examId, classId, subjectId } = req.query as getParams;

  if (!yearId || !examId || !classId || !subjectId) {
    return res.send([]);
  }

  const year = await FiscalYear.findOne({ id: yearId });
  const exam = await Exam.findOne({ id: examId });
  const clazz = await Class.findOne({ id: classId });
  const subject = await Subject.findOne({ id: subjectId });

  const grades = await Grade.find({
    year,
    exam,
    class: clazz,
    subject,
  });
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

  const [gradeFound] = await Grade.find({
    year,
    exam,
    class: clazz,
    subject,
    gradeType: grade.gradeType,
  });

  if (gradeFound) {
    return res
      .status(400)
      .send({ message: 'Grade already created for the subject' });
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

  const result = await Grade.create(gradeToCreate).save();
  res.send({ message: 'Grade created successfully.', grade: result });
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
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

  const [gradeFound] = await Grade.find({
    year,
    exam,
    class: clazz,
    subject,
    gradeType: grade.gradeType,
  });

  if (!gradeFound) {
    return res.status(404).send({ message: 'Grade not found.' });
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

  await Grade.update({ id: gradeFound.id }, gradeToUpdate);
  res.send({
    message: 'Grade updated successfully.',
    grade: { id: gradeFound.id, ...gradeToUpdate },
  });
});

export default secureRoute(handler);
