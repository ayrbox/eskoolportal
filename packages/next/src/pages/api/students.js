import { Student, Class, Section } from '@eskoolportal/api/src/models';
import authenticate from '@lib/authenticate';

export default async function handler(req, res) {
  const students = await Student.findAll({
    include: [
      { model: Class, as: 'class' },
      { model: Section, as: 'section' },
    ],
  });

  res.status(200).json(students);
}
