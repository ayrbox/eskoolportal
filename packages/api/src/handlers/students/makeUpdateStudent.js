module.exports = ({ Student }) => {
  return async function ({ params, body }, res) {
    const { id } = params;
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

    await Student.update(
      {
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
      },
      {
        where: {
          id
        }
      }
    );

    res.json({
      msg: "Updated"
    });
  };
};
