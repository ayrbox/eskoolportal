/**
 * Exports a function that takes connection as paramenters
 * Loads all the models and map associations and returns the model instances
 *
 */

const UserModel = require('./User');

module.exports = function (connection) {
  const User = UserModel(connection);

  // Map assications here

  return {
    User,
  };
};
