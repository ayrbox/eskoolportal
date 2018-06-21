const express = require("express");
const Student = require("../../models/Student");
const passport = require("passport");

const validateStudentInput = require("../../validation/student");

const router = express.Router();

// @route GET api/students/
// @desc list all the students
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Student.find()
      .then(students => {
        if (!students) {
          errors.students = "There are no studnet records";
          return res.status(404).json(errors);
        }
        res.json(students);
      })
      .catch(err => {
        res.status(500).json({ studnets: "Error getting students" });
      });
  }
);

// @route GET /api/students/:id
// @desc get student profile
// @desc Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Student.findOne({ _id: req.params.id })
      .then(student => {
        if (!student) {
          errors.student = "Student not found";
          return res.status(404).json(errors);
        }
        res.json(student);
      })
      .catch(err => {
        res.status(500).json({ student: "Error getting student" });
      });
  }
);

// @route POST /api/students
// @desc create new student profile
// @desc Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const studentProfile = {};
    studentProfile.name = req.body.name;
    studentProfile.dateOfBirth = req.body.dateOfBirth;
    studentProfile.gender = req.body.gender;
    studentProfile.address = req.body.address;
    studentProfile.contactNo = req.body.contactNo;
    studentProfile.email = req.body.email;

    new Student(studentProfile).save().then(studnet => res.json(student));
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const studentProfile = {
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      address: req.body.address,
      contactNo: req.body.contactNo,
      email: req.body.email,
      joinDate: req.body.joinDate,
      class: req.body.class,
      section: req.body.section
    };

    //check for unique student code
    Student.findOne({ _id: req.params.id }).then(student => {
      if (!student) {
        return req.status(404).json({ msg: "Not found" });
      }

      Student.findOneAndUpdate(
        { _id: req.params.id },
        { $set: studentProfile },
        { new: true }
      ).then(updatedStudent => res.json(updatedStudent));
    });
  }
);

module.exports = router;
