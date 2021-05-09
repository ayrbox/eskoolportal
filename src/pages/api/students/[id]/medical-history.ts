import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { MedicalHistory } from '~/database/entities/MedicalHistory';

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const studentId = req.query.id as string;

  const medicalHistory = await MedicalHistory.find({
    where: {
      student: studentId,
    },
  });
  console.log(medicalHistory);

  res.send(medicalHistory);
});

export default secureRoute(handler);
