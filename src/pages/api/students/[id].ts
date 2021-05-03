import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { Student } from '~/database/entities/Student';
import { NextApiRequest, NextApiResponse } from 'next';
import { studentSchema } from '~/lib/validations';
import { ValidationError } from 'yup';
import omit from 'lodash/omit';

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const studentId = req.query.id as string;
    const studentData = omit<Student>(
      req.body,
      'class',
      'section',
      'createdAt',
      'updatedAt'
    );

    await studentSchema.validate(studentData, { abortEarly: false });
    await Student.update(studentId, studentData);

    return res.status(200).json({ message: 'Student data updated' });
  } catch (validationError) {
    if (validationError instanceof ValidationError) {
      return res.status(400).json({
        message: 'Invalid Student information',
        error: validationError.errors,
      });
    } else {
      return res.status(500).json({ message: 'Unexpected error.' });
    }
  }
});

handler.get((_, res: NextApiResponse) => {
  res.status(405).json({ message: 'Not allowed' });
});

export default secureRoute(handler);
