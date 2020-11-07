import nextConnect from "next-connect";
import models from "@eskoolportal/api/src/models";

import auth from "../../../../middlewares/auth";

const handler = async function (req, res) {
  const { classId } = req.query;
  const classInfo = await models.Class.findByPk(classId);

  res.status(200).json(classInfo);
};

export default nextConnect().use(auth).get(handler);
