import { NextApiResponse, NextApiRequest } from 'next';
import nextConnect from 'next-connect';
import { Exam } from '~/database/entities/Exam';
import { secureRoute } from '~/lib/secureRoute';
import { examSchema } from '~/lib/validations';

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const exams = await Exam.find();
  res.send(exams);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const exam = req.body as Exam;

  await examSchema.validate(exam, { abortEarly: false });
  const examCreated = await Exam.create(exam).save();
  res.status(201).send(examCreated);
});

export default secureRoute(handler);
