import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';

import prisma from '~/lib/prisma';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const classGroupId = req.query.classId as string;

    const classDetail = await prisma.student.findMany({
        where: {
            classGroupId: classGroupId,
        },
    });

    res.status(200).json(classDetail);
};

export default secureRoute(handler);
