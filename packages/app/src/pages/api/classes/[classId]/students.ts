import { Student } from '@eskoolportal/core/lib/entities/Student';

import withAuthentication from '~/lib/withAuthentication';

const handler = async function (req, res) {
  const { classId, section } = req.query;

  const whereClause: { [key: string]: string } = {
    classId,
  };

  if (section && section !== 'ALL') {
    whereClause.sectionId = section;
  }
  console.log(whereClause);

  const students = await Student.find({
    where: whereClause,
  });

  return res.status(200).json(students);
};

export default withAuthentication(handler);
