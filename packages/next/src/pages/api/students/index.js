import { Student, Class, Section } from '@eskoolportal/api/src/models';
import { withAuthentication } from '@lib/authenticate';

const handler = async (req, res) => {
  const students = await Student.findAll({
    include: [
      { model: Class, as: 'class' },
      { model: Section, as: 'section' },
    ],
  });

  res.status(200).json(students);
};

export default withAuthentication(handler);
