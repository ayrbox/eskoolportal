import { Student, Class, Section } from '@eskoolportal/api/src/models';
import authenticate from '@lib/authenticate';

export default authenticate(async function handler(req, res) {
  const { classId, section } = req.query;

  const whereClause = {
    classId,
  };

  if (section !== 'ALL') {
    whereClause.sectionId = section;
  }

  const students = await Student.findAll({
    include: [
      { model: Class, as: 'class' },
      { model: Section, as: 'section' },
    ],
    where: whereClause,
  });

  res.status(200).json(students);
});
