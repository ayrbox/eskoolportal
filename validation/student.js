const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudent(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.dataOfBirth = !isEmpty(data.dataOfBirth) ? data.dataOfBirth : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (validator.isEmpty(data.name)) {
    errors.handle = "Name is required";
  }

  if (!validator.isLength(data.name, { min: 5, max: 100 })) {
    errors.handle = "Name needs to be between 5 to 100 characters";
  }

  if (validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "Date of birth is mandatory";
  }

  if (validator.isEmpty(data.gender)) {
    errors.gender = "Gender is required";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Address is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
