import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { secureRoute } from '~/lib/secureRoute';
import prisma from '~/lib/prisma';

const handler = nextConnect();

handler.get(async (_, res: NextApiResponse) => {
    const classes = await prisma.classGroup.findMany();
    res.status(200).json(classes);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const classData = req.body;

    console.log(classData);
    res.status(204).end();
});

export default secureRoute(handler);
