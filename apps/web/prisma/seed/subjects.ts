import { PrismaClient } from '@prisma/client';

export const subjects = [
    {
        name: 'Compulsory Nepali',
        description: 'Compulsory for all class groups.',
    },
    {
        name: 'Compulsory English',
        description: 'Compulsory for all class groups. ',
    },
    {
        name: 'Mathematics',
        description: 'Compulsory maths with arthemetics, algebra, geometry.',
    },
    { name: 'Computer Science', description: 'Optional for secondary' },
    { name: 'Option Maths', description: 'Optional for secondary' },
    { name: 'Social Studies', description: 'Compulsory' },
    { name: 'History and Geography', description: 'Secondary classes only' },
    { name: 'Biology', description: 'Secondary classes' },
    { name: 'Chemistry', description: 'Secondary classes' },
    { name: 'Physics', description: 'Secondary classes' },
    {
        name: 'Science',
        description:
            'Primary classes only (inclues biology, chemistry, physics)',
    },
];

export default async function (prisma: PrismaClient) {
    await prisma.subject.createMany({
        data: subjects.map(({ name, description }) => ({
            name,
            description,
        })),
    });
}
