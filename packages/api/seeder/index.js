/**
 * Temporary seeder file.
 */

const Sequelize = require('sequelize');
const models = require('../models');

const HOST = 'localhost';
const DB = 'eskoolportal';
const DB_USER = 'eskuser';
const DB_PWD = 'eskpassword';
const PORT = 5466;

const userPopulator = require('./userPopulator');
const studentPopulator = require('./studentPopulator');

const classPopulator = require('./classPopulator');
const sectionPopulator = require('./sectionPopulator');

const dbConnection = new Sequelize(DB, DB_USER, DB_PWD, {
  dialect: 'postgres',
  host: HOST,
  port: PORT,
  logging: false,
});

async function start() {
  await dbConnection;
  console.log('Database connected successfully');

  const { User, Student, Class, Section } = models(dbConnection);

  await dbConnection.sync({
    force: true,
  });

  // Admin user
  await User.create({
    name: 'Administrator',
    email: 'admin@eskoolportal.com',
  });

  await userPopulator(User);
  await classPopulator(Class);
  await sectionPopulator(Section);
  await studentPopulator(Student, Class, Section);
}

start()
  .then(() => {
    console.log('Seeding completed');
  })
  .catch(err => {
    console.log('ERROR: Seeding database.', err);
  })
  .finally(() => {
    dbConnection.close();
  });
