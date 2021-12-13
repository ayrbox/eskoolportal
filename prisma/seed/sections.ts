import { PrismaClient } from '@prisma/client';

export const sections = ['A', 'B', 'C'];

export default async function seedSections(prisma: PrismaClient) {
    await prisma.section.createMany({
        data: sections.map((name, order) => ({
            name,
            order,
        })),
    });
}
