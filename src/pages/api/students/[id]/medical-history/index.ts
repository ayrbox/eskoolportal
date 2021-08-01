import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { MedicalHistory } from '~/database/entities/MedicalHistory';
import { Student } from '~/database/entities/Student';

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const studentId = req.query.id as string;

  const medicalHistory = await MedicalHistory.find({
    where: {
      student: studentId,
    },
  });
  res.send(medicalHistory);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const studentId = req.query.id as string;
  const medicalHistory = req.body as MedicalHistory;

  // TODO: validate body

  const student = await Student.findOne(studentId);
  const newMedicalHistory = await MedicalHistory.create({
    ...medicalHistory,
    student,
  }).save();

  res.send(newMedicalHistory);
});

export default secureRoute(handler);
