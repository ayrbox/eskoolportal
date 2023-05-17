import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { secureRoute } from "~/lib/secureRoute";
import prisma from "~/lib/prisma";
import { Subject } from "@prisma/client";

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subjectId = req.query.subjectId as string;
    const data = req.body as Subject;
    await prisma.subject.update({
      data,
      where: {
        id: subjectId,
      },
    });
    res.status(200).send({ message: "Subject updated successfully." });
  } catch (err) {
    res.status(500).send({ message: "Unable to update subject." });
  }
});

export default secureRoute(handler);
