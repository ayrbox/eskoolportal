import { Factory } from 'rosie';
import { name, datatype, random, internet, date, address, phone } from 'faker';
import { Prisma, PrismaClient } from '@prisma/client';

const studentFactory = new Factory().attrs({
    name: () => name.findName(),
    dateOfBirth: () => date.past(4),
    gender: () => random.arrayElement(['male', 'female']),
    address: () => address.streetName(),
    contactNo: () => phone.phoneNumber(),
    email: () => internet.email(),
    joinDate: () => date.past(),
    classGroupId: undefined,
    sectionId: undefined,
    rollNo: () => datatype.number(),
    referenceCode: () => random.alphaNumeric(5).toUpperCase(),
    createdAt: () => new Date(),
    updatedAt: () => new Date(),
});

export const buildStudents = function (
    classGroupId: string,
    sectionId: string
): Prisma.StudentCreateInput[] {
    return studentFactory.buildList(30, {
        classGroupId: classGroupId,
        sectionId: sectionId,
    }) as Prisma.StudentCreateInput[];
};

export default async function seedStudents(prisma: PrismaClient) {
    const classGroupIds = await prisma.classGroup
        .findMany({ select: { id: true } })
        .then((ids) => ids.map(({ id }) => id));

    const sectionIds = await prisma.section
        .findMany({ select: { id: true } })
        .then((ids) => ids.map(({ id }) => id));

    const classGroupsWithSections = classGroupIds
        .map((classGroupId) => {
            return sectionIds.map((sectionId) => [classGroupId, sectionId]);
        })
        .flat();

    const batches = classGroupsWithSections.map(
        async ([classGroupId, sectionId]) =>
            prisma.student.createMany({
                data: buildStudents(classGroupId, sectionId),
            })
    );

    for (const batch of batches) {
        await batch;
    }
}
