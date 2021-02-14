import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { Student } from '~/database/entities/Student';
import { getConnection } from 'typeorm';

import { object, string, date, mixed, ValidationError } from 'yup';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = nextConnect();

const studentSchema = object().shape({
  name: string().min(3).required('Name is required.'),
  dateOfBirth: date().required('Date of birth is required.'),
  gender: mixed().oneOf(['male', 'female']).required('Gender is requried.'),
  address: string().required('Address is required.'),
  email: string().email().required('Email is required to contact you.'),
  joinDate: date(),
  rollno: string(),
  contactNo: string().required(
    'Phone or any other contact number is required.'
  ),
  referenceCode: string(),
  classId: string().required('Please specify student class.'),
  sectionId: string().required('Please specify student section.'),
});

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await studentSchema.validate(req.body, { abortEarly: false });

    const {
      id,
      name,
      createdAt,
      updatedAt,
      dateOfBirth,
      gender,
      address,
      email,
      joinDate,
      rollno,
      contactNo,
      referenceCode,
      classId,
      sectionId,
    } = req.body;

    // TODO: move to core
    await getConnection()
      .createQueryBuilder()
      .update(Student)
      .set({
        name,
        createdAt,
        updatedAt,
        dateOfBirth,
        gender,
        address,
        email,
        joinDate,
        rollno,
        contactNo,
        referenceCode,
        classId,
        sectionId,
      })
      .where('id = :id', { id })
      .execute();

    // await Student.save( {
    //   id
    //     name,
    //     createdAt,
    //     updatedAt,
    //     dateOfBirth,
    //     gender,
    //     address,
    //     email,
    //     joinDate,
    //     rollno,
    //     contactNo,
    //     referenceCode,
    //     classId,
    //     sectionId,
    //   }
    // ).save();

    // ,
    //       {
    //         where: {
    //           id,
    //         },
    //       }

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

//@ts-ignore TODO: Fix type for NextConnect
export default secureRoute(handler);
