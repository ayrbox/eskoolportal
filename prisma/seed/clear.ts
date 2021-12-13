import { PrismaClient } from '@prisma/client';

export default async function clear(prisma: PrismaClient): Promise<void> {
    await prisma.student.deleteMany();
    await prisma.user.deleteMany();
    await prisma.section.deleteMany();
    await prisma.classGroup.deleteMany();
}
