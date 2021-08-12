import nextConnect from 'next-connect';
import { NextApiHandler } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import { examSchema } from '~/lib/validations';
import { Exam } from '~/database/entities/Exam';

const updateHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const examToUpdate = req.body as Exam;

  await examSchema.validate(examToUpdate, { abortEarly: false });
  const examUpdated = await Exam.update(id, examToUpdate);

  res.send(examUpdated);
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  (await Exam.findOne(id)).softRemove();

  res.send({
    message: 'Deleted',
  });
};

const handler = nextConnect().put(updateHandler).delete(deleteHandler);

export default secureRoute(handler);
