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

const dbConnection = new Sequelize(DB, DB_USER, DB_PWD, {
  dialect: 'postgres',
  host: HOST,
  port: PORT,
  logging: false,
});

async function start() {
  await dbConnection;
  console.log('Database connected successfully');

  const { User, Student } = models(dbConnection);

  await dbConnection.sync();

  // Admin user
  await User.create({
    name: 'Administrator',
    email: 'admin@eskoolportal.com',
  });

  await userPopulator(User);
  await studentPopulator(Student);
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
