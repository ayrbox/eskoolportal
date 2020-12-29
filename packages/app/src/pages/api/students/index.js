import withAuthentication from '@lib/authenticate';
import nextConnect from 'next-connect';
import { Student } from '@eskoolportal/api/src/models';
import { v4 as uuid } from 'uuid';

import { object, string, date, mixed, ValidationError } from 'yup';

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

handler.post(async (req, res) => {
  try {
    await studentSchema.validate(req.body, { abortEarly: false });

    const {
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

    await Student.create({
      id: uuid(),
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
    });

    return res.status(200).json({ message: 'Student enrolled' });
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

handler.get((_, res) => {
  res.status(405).json({ message: 'Not allowed' });
});

export default withAuthentication(handler);
