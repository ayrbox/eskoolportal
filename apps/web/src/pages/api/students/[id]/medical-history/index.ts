import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma';
import type { MedicalHistory } from '@prisma/client';

const handler = nextConnect();

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const studentId = req.query.id as string;
    const medicalHistory = await prisma.medicalHistory.findMany({
        where: {
            studentId,
        },
    });
    res.send(medicalHistory);
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const studentId = req.query.id as string;
    const medicalHistory = req.body as MedicalHistory;

    // TODO: validate body
    const newMedicalHistory = await prisma.medicalHistory.create({
        data: {
            ...medicalHistory,
            studentId,
        },
    });

    res.send(newMedicalHistory);
});

export default secureRoute(handler);
