"use strict";

const CLASSES = ["Nursery", "JKG", "SKG", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "classes",
      CLASSES.map((name, idx) => ({
        id: uuidv4(),
        name,
        order: idx,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("classes", null, {});
  }
};
