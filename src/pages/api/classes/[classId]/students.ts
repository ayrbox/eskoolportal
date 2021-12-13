import { NextApiRequest, NextApiResponse } from 'next';
import { secureRoute } from '~/lib/secureRoute';
import prisma from '~/lib/prisma';

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
    const classGroupId = req.query.classId as string;
    const sectionId = req.query.section as string;

    const students = await prisma.student.findMany({
        where: {
            classGroupId,
            sectionId: sectionId && sectionId !== 'ALL' ? sectionId : undefined,
        },
        include: {
            Class: true,
            Section: true,
        },
    });

    return res.status(200).json(students);
};

export default secureRoute(handler);
