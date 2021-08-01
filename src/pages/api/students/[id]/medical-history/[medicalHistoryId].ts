import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { MedicalHistory } from '~/database/entities/MedicalHistory';
import { Student } from '~/database/entities/Student';

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  const studentId = req.query.id as string;
  const medicalHistoryId = req.query.medicalHistoryId as string;
  const medicalHistoryToUpdate = req.body as MedicalHistory;

  const student = await Student.findOne(studentId);

  // TODO: validate
  // await medicalHistory.validate(medicalHistoryToUpdate, { abortEarly: false });

  const updatedMedicalHistory = await MedicalHistory.update(medicalHistoryId, {
    ...medicalHistoryToUpdate,
    student,
  });

  res.send(updatedMedicalHistory);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const medicalHistoryId = req.query.medicalHistoryId as string;
  (await MedicalHistory.findOne(medicalHistoryId)).softRemove();
  res.send({
    message: 'Deleted',
  });
});

export default secureRoute(handler);
