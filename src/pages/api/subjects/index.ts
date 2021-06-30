import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { Subject } from "~/database/entities/Subject";
import { secureRoute } from "~/lib/secureRoute";

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const subjects = await Subject.find();
  res.status(200).json(subjects);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subject = req.body;
    await Subject.save(subject);
    res.status(204).end();
  } catch (err) {
    res.status(500).send({ message: "Unable to save subject." });
  }
});

export default secureRoute(handler);
