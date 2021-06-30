import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";
import { secureRoute } from "~/lib/secureRoute";
import { Event } from "~/database/entities/Event";
import { eventSchema } from "~/lib/validations";

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
  const events = await Event.find();
  res.send(events);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const eventData = req.body as Event;

  await eventSchema.validate(eventData, { abortEarly: false });

  const newEvent = await Event.create(eventData).save();
  res.send(newEvent);
});

export default secureRoute(handler);
