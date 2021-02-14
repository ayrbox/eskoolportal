import { Student } from '~/database/entities/Student';
import { NextApiRequest, NextApiResponse } from 'next';

import { secureRoute } from '~/lib/secureRoute';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const classId = req.query.classId as string;
  const section = req.query.section as string;
  const whereClause: Record<string, string> = { classId };

  if (section && section !== 'ALL') {
    whereClause.sectionId = section;
  }

  const students = await Student.find({
    where: whereClause,
  });

  return res.status(200).json(students);
};

export default secureRoute(handler);
