module.exports = ({ Student }) => {
  return async function ({ body }, res) {
    const {
      name,
      dateOfBirth,
      gender,
      address,
      contactNo,
      email,
      joinDate,
      classRollNo,
      referenceCode,
      classId,
      sectionId
    } = body;

    await Student.create({
      name,
      dateOfBirth,
      gender,
      contactNo,
      email,
      joinDate,
      classRollNo,
      referenceCode,
      classId,
      sectionId
    });

    res.json({
      msg: "Created"
    });
  };
};
