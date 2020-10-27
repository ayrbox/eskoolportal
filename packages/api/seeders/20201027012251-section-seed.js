"use strict";

const SECTIONS = ["A", "B", "C"];
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "sections",
      SECTIONS.map((name, idx) => ({
        id: uuidv4(),
        name,
        order: idx,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sections", null, {});
  }
};
