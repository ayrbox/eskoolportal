"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("students", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      contactNo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      joinDate: {
        type: Sequelize.DATE
      },
      rollno: {
        type: Sequelize.INTEGER
      },
      referenceCode: {
        type: Sequelize.STRING,
        unique: true
      },
      classId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "classes"
          },
          key: "id"
        },
        allowNull: false
      },
      sectionId: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "sections"
          },
          key: "id"
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("students");
  }
};
