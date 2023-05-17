import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import nextConnect from 'next-connect';

import prisma from '~/lib/prisma';
import type { Prisma } from '@prisma/client';

const handler = nextConnect();

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    const studentId = req.query.id as string;
    const medicalHistoryId = req.query.medicalHistoryId as string;
    const medicalHistoryToUpdate =
        req.body as Prisma.MedicalHistoryUncheckedUpdateInput;

    // TODO: validate
    // await medicalHistory.validate(medicalHistoryToUpdate, { abortEarly: false });

    const updatedMedicalHistory = await prisma.medicalHistory.update({
        data: {
            ...medicalHistoryToUpdate,
            studentId,
        },
        where: {
            id: medicalHistoryId,
        },
    });

    res.send(updatedMedicalHistory);
});

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const medicalHistoryId = req.query.medicalHistoryId as string;
    await prisma.medicalHistory.delete({
        where: {
            id: medicalHistoryId,
        },
    });
    res.send({
        message: 'Deleted',
    });
});

export default secureRoute(handler);
