import { Factory } from "rosie";
import { name, random, internet } from "faker";
import { BaseEntity } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "../entities/User";

// //TODO: move to helper methods
const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const demoPassword = await bcrypt.hash(password, salt);
  return demoPassword;
};

const userFactory = new Factory().attrs({
  id: () => random.uuid(),
  name: () => name.findName(),
  email: () => internet.email(),
  avatar: () => internet.avatar(),
  password: null,
});

export default async function (): Promise<BaseEntity[]> {
  const demoPassword = await hashPassword("Passw0rd!23");

  // super admin
  const superAdmin = userFactory.build({
    name: "Administrator",
    email: "admin@eskoolportal.com",
    password: demoPassword,
  }) as User;

  const demoUsers = userFactory.buildList(9, {
    password: demoPassword,
  }) as User[];

  return User.save([superAdmin, ...demoUsers]);
}
