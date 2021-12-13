import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';

import { PrismaClient } from '@prisma/client';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const classGroupId = req.query.classId as string;

    const prisma = new PrismaClient();
    const classDetail = await prisma.student.findMany({
        where: {
            classGroupId: classGroupId,
        },
    });

    res.status(200).json(classDetail);
};

export default secureRoute(handler);
