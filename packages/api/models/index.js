/**
 * Exports a function that takes connection as paramenters
 * Loads all the models and map associations and returns the model instances
 *
 */

const UserModel = require('./User');

const StudentModel = require('./Student');
const ClassModel = require('./Class');
const SectionModel = require('./Section');

module.exports = function (connection) {
  const User = UserModel(connection);

  const Student = StudentModel(connection);
  const Class = ClassModel(connection);
  const Section = SectionModel(connection);

  // Map assications here

  Student.belongsTo(Class, {
    foreignKey: { name: 'class_id', allowNull: false },
  });
  Class.hasMany(Student, {
    foreignKey: {
      name: 'class_id',
      allowNull: false,
    },
  });
  Student.belongsTo(Section, {
    foreignKey: {
      name: 'section_id',
      allowNull: false,
    },
  });
  Section.hasMany(Student, {
    foreignKey: {
      name: 'section_id',
      allowNull: false,
    },
  });

  return {
    User,
    Student,
    Class,
    Section,
  };
};
