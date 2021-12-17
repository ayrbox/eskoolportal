import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";
import { secureRoute } from "~/lib/secureRoute";
import { eventSchema } from "~/lib/validations";
import prisma from "~/lib/prisma";
import { Prisma } from "@prisma/client";

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const events = await prisma.event.findMany();
  res.send(events);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const eventData = req.body as Prisma.EventCreateInput;

  await eventSchema.validate(eventData, { abortEarly: false });

  const newEvent = await prisma.event.create({
    data: eventData,
  });
  res.send(newEvent);
});

export default secureRoute(handler);
