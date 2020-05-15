const Sequelize = require('sequelize');

module.exports = conn => {
  return conn.define('student', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: Sequelize.ENUM('Male', 'Female', 'Unknown'),
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
    },
    contactNo: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    joinDate: {
      type: Sequelize.DATE,
    },
    classRollNo: {
      type: Sequelize.INTEGER,
    },
    referenceCode: {
      type: Sequelize.STRING,
    },
  });
};
