/**
 * Temporary seeder file.
 */

require('dotenv').config();
const Sequelize = require('sequelize');
const models = require('../models');

const { DB_HOST, DB, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const userPopulator = require('./userPopulator');
const studentPopulator = require('./studentPopulator');

const classPopulator = require('./classPopulator');
const sectionPopulator = require('./sectionPopulator');

const dbConnection = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
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
