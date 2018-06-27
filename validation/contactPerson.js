const validator = require("validator");

const isEmpty = require("./is-empty");

module.exports = function validateContactPerson(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.relation = !isEmpty(data.relation) ? data.relation : "";
  data.contactNo = !isEmpty(data.contactNo) ? data.contactNo : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.relation)) {
    errors.relation = "Relation field is required";
  }

  if (validator.isEmpty(data.contactNo)) {
    errors.contactNo = "Contact No is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (validator.isEmail(data.email)) {
    errors.email = "Enter valid email";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
