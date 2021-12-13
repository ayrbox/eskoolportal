import { Factory } from 'rosie';
import { name, internet } from 'faker';
import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';

// TODO: move to helper methods
const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const demoPassword = await bcrypt.hash(password, salt);
    return demoPassword;
};

const userFactory = new Factory().attrs({
    name: () => name.findName(),
    email: () => internet.email(),
    avatar: () => internet.avatar(),
    password: null,
});

export const buildUsers = async (): Promise<Prisma.UserCreateInput[]> => {
    const demoPassword = await hashPassword('Passw0rd!23');

    // super admin
    const superAdmin = userFactory.build({
        name: 'Super Administrator',
        email: 'admin@eskoolportal.com',
        password: demoPassword,
    }) as Prisma.UserCreateInput;

    const demoUsers = userFactory.buildList(9, {
        password: demoPassword,
    }) as Prisma.UserCreateInput[];

    return [superAdmin, ...demoUsers];
};

export default async function seedUsers(prisma: PrismaClient) {
    const users = await buildUsers();
    await prisma.user.createMany({
        data: users,
    });
}
