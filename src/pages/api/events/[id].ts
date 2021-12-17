import nextConnect from "next-connect";
import { NextApiHandler } from "next";
import { secureRoute } from "~/lib/secureRoute";
import { eventSchema } from "~/lib/validations";
import { Prisma } from "@prisma/client";
import prisma from "~/lib/prisma";

const updateHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;
  const eventToUpdate = req.body as Prisma.EventUpdateInput;

  await eventSchema.validate(eventToUpdate, { abortEarly: false });
  const eventUpdated = await prisma.event.update({
    data: eventToUpdate,
    where: {
      id,
    },
  });

  res.send(eventUpdated);
};

const deleteHandler: NextApiHandler = async (req, res) => {
  const id = req.query.id as string;

  await prisma.event.delete({ where: { id } });

  res.send({
    message: "Deleted",
  });
};

const handler = nextConnect().put(updateHandler).delete(deleteHandler);

export default secureRoute(handler);
