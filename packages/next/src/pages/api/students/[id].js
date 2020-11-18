import withAuthentication from '@lib/authenticate';
import nextConnect from 'next-connect';
import { Student } from '@eskoolportal/api/src/models';

const handler = nextConnect();

handler.post(async (req, res) => {
  // TODO: validate  is must
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
    classRollNo,
    contactNo,
    referenceCode,
    classId,
    sectionId,
  } = req.body;

  await Student.update(
    {
      name,
      createdAt,
      updatedAt,
      dateOfBirth,
      gender,
      address,
      email,
      joinDate,
      classRollNo,
      contactNo,
      referenceCode,
      classId,
      sectionId,
    },
    {
      where: {
        id,
      },
    }
  );

  res.status(200).json({ message: 'Student data updated' });
});

handler.get((_, res) => {
  res.status(405).json({ message: 'Not allowed' });
});

export default withAuthentication(handler);
