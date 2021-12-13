import { PrismaClient } from '@prisma/client';

export const classGroups = [
    'Nursery',
    'JKG',
    'SKG',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
];

export default async function (prisma: PrismaClient) {
    await prisma.classGroup.createMany({
        data: classGroups.map((name, order) => ({
            name,
            order,
        })),
    });
}
