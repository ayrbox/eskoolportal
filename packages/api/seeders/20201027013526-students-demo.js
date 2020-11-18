'use strict';

const { Factory } = require('rosie');
const faker = require('faker');

const { name, internet, random, date, address, phone } = faker;

const studentFactory = new Factory().attrs({
  id: () => random.uuid(),
  name: () => name.findName(),
  dateOfBirth: () => date.past(4),
  gender: () => random.arrayElement(['male', 'female']),
  address: () => address.streetName(),
  contactNo: () => phone.phoneNumber(),
  email: () => internet.email(),
  joinDate: () => date.past(),
  classId: undefined,
  sectionId: undefined,
  rollno: () => random.number(),
  referenceCode: () => random.alphaNumeric(5).toUpperCase(),
  createdAt: () => new Date(),
  updatedAt: () => new Date(),
});

const CLASS_SIZE = 30;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const classes = await queryInterface.sequelize.query(
      `SELECT id, name from classes;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const sections = await queryInterface.sequelize.query(
      `SELECT id, name from sections;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const insertPromises = [];
    classes.forEach((class_) => {
      sections.forEach((section) => {
        const students = studentFactory.buildList(CLASS_SIZE, {
          classId: class_.id,
          sectionId: section.id,
        });
        insertPromises.push(queryInterface.bulkInsert('students', students));
      });
    });

    await Promise.all(insertPromises);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', null, {});
  },
};
