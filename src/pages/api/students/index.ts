import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { Student } from '~/database/entities/Student';
import { ValidationError } from 'yup';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import { studentSchema } from '~/lib/validations';

const handler = nextConnect();

// TODO: repository and validate inside core
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const studentData = req.body;
    await studentSchema.validate(studentData, { abortEarly: false });
    const studentCreated = await Student.create(studentData).save();
    return res.status(201).json(studentCreated);
  } catch (validationError) {
    if (validationError instanceof ValidationError) {
      return res.status(400).json({
        message: 'Invalid Student information',
        error: validationError.errors,
      });
    } else {
      //TODO: bunyan log here
      console.log(validationError);
      return res.status(500).json({ message: 'Unexpected error.' });
    }
  }
});

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query.q as string;

  if (!q) {
    res.status(200).send([]);
    return;
  }

  const result = await getRepository(Student)
    .createQueryBuilder('s')
    .leftJoinAndSelect('s.class', 'class', 'class.id = s.classId')
    .leftJoinAndSelect('s.section', 'section', 'section.id = s.sectionId')
    .where('LOWER(s.name) like LOWER(:name)', { name: `%${q}%` })
    .orderBy('s.name')
    .take(10)
    .cache(true)
    .getMany();

  res.status(200).send(result);
});

//@ts-ignore TODO: fix type for nextConnect
export default secureRoute(handler);
