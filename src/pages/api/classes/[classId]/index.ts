import { NextApiRequest, NextApiResponse } from "next";
import { Class } from "~/database/entities/Class";
import { secureRoute } from "~/lib/secureRoute";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  const classId = req.query.classId as string;
  const classDetail = await Class.findOne({ id: classId });

  res.status(200).json(classDetail);
};

export default secureRoute(handler);
