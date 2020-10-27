"use strict";

const { Factory } = require("rosie");
const faker = require("faker");
const bcrypt = require("bcrypt");

const { name, internet, random } = faker;

//TODO: move to helper methods
const hashPassword = async (password = "Passw0rd!23") => {
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
  createdAt: () => new Date(),
  updatedAt: () => new Date()
});

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoPassword = await hashPassword();
    // super admin
    const superAdmin = userFactory.build({
      name: "Administrator",
      email: "admin@eskoolportal.com",
      password: demoPassword
    });

    const demoUsers = userFactory.buildList(9, { password: demoPassword });
    try {
      await queryInterface.bulkInsert("users", [superAdmin, ...demoUsers], {});
    } catch (err) {
      console.log(err.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  }
};
