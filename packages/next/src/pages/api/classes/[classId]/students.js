import { Student, Class, Section } from '@eskoolportal/api/src/models';
import withAuthenticate, { withAuthentication } from '@lib/authenticate';

const handler = async function (req, res) {
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

  return res.status(200).json(students);
};

export default withAuthentication(handler);
