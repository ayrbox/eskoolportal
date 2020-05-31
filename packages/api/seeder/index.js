/**
 * Temporary seeder file.
 */
const Sequelize = require("sequelize");
const { Connection, User, Student, Class, Section } = require("../src/models");

const userPopulator = require("./userPopulator");
const studentPopulator = require("./studentPopulator");

const classPopulator = require("./classPopulator");
const sectionPopulator = require("./sectionPopulator");

async function start() {
  await Connection.sync({
    force: true
  });

  // Admin user
  await User.create({
    name: "Administrator",
    email: "admin@eskoolportal.com",
    password: "Passw0rd1!"
  });

  await userPopulator(User);
  await classPopulator(Class);
  await sectionPopulator(Section);
  await studentPopulator(Student, Class, Section);
}

start()
  .then(() => {
    console.log("Seeding completed");
  })
  .catch(err => {
    console.log("ERROR: Seeding database.", err);
  })
  .finally(() => {
    Connection.close();
  });
