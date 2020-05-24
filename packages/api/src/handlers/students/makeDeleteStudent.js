module.exports = ({ Student, Class, Section }) => {
  return async function ({ params }, res) {
    const { id } = params;
    await Student.destroy({
      where: {
        id
      }
    });

    res.json({
      msg: "Deleted"
    });
  };
};
