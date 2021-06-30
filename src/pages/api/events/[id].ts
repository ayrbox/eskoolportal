import nextConnect from "next-connect";
import { NextApiHandler } from "next";
import { secureRoute } from "~/lib/secureRoute";
import { eventSchema } from "~/lib/validations";
import { Event } from "~/database/entities/Event";

const updateHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const eventToUpdate = req.body as Event;

  await eventSchema.validate(eventToUpdate, { abortEarly: false });
  const eventUpdated = await Event.update(id, eventToUpdate);

  res.send(eventUpdated);
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  (await Event.findOne(id)).softRemove();

  res.send({
    message: "Deleted",
  });
};

const handler = nextConnect().put(updateHandler).delete(deleteHandler);

export default secureRoute(handler);
