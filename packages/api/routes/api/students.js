const express = require('express');
const passport = require('passport');

const validateStudentInput = require('../../validation/student');
const validateContactPersonInput = require('../../validation/contactPerson');

const pdfGenerator = require('../../utils/pdfGenerator');
const database = require('../../database');
const { Student, Class, Section } = require('../../models')(database);
const router = express.Router();

// @route GET api/students/
// @desc list all the students
// @access Private
router.get(
  '/',
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Student.findAll({
      include: [Class, Section],
    })
      .then(students => {
        if (!students) {
          errors.students = 'There are no student records found';
          return res.status(404).json(errors);
        }
        res.json(students);
      })
      .catch(err => {
        res.status(500).json({ studnets: 'Error getting students' });
      });
  },
);

// @route GET /api/students/:id
// @desc get student profile
// @desc Private
router.get(
  '/:id',
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Student.findOne({ _id: req.params.id })
      .then(student => {
        if (!student) {
          errors.student = 'Student not found';
          return res.status(404).json(errors);
        }
        res.json(student);
      })
      .catch(err => {
        res.status(500).json({ student: 'Error getting student' });
      });
  },
);

// @route POST /api/students
// @desc create new student profile
// @desc Private
router.post(
  '/',
  // passport.authenticate("jwt", { session: false }),
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
      section: req.body.section,
      classRollNo: req.body.classRollNo,
      referenceCode: req.body.referenceCode,
    };

    new Student(studentProfile).save().then(student => res.json(student));
  },
);

// @route PUT /api/students
// @desc update new student profile
// @desc Private
router.put(
  '/:id',
  // passport.authenticate("jwt", { session: false }),
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
      section: req.body.section,
      classRollNo: req.body.classRollNo,
      referenceCode: req.body.referenceCode,
    };

    //check for unique student code
    Student.findOne({ _id: req.params.id }).then(student => {
      if (!student) {
        return req.status(404).json({ msg: 'Not found' });
      }

      Student.findOneAndUpdate(
        { _id: req.params.id },
        { $set: studentProfile },
        { new: true },
      ).then(updatedStudent => res.json(updatedStudent));
    });
  },
);

// passport.authenticate("jwt", { session: false }),
// Prints all students list in pdf
router.get('/list/pdf', (req, res) => {
  Student.find()
    .then(students => {
      if (!students) {
        errors.students = 'There are no student records found';
        return res.status(404).json(errors);
      }
      pdfGenerator(
        'Student List',
        {
          columns: [
            {
              id: 'name',
              header: 'Name',
              align: 'left',
              width: 150,
            },
            {
              id: 'class',
              header: 'Class',
              width: 50,
            },
            {
              id: 'section',
              header: 'Section',
              width: 50,
            },
            {
              id: 'gender',
              header: 'Gender',
              width: 50,
            },
            {
              id: 'dateOfBirth',
              header: 'DOB',
              width: 50,
            },
            {
              id: 'contactNo',
              header: 'Contact No',
              width: 100,
            },
            {
              id: 'email',
              header: 'Email',
              width: 120,
            },
          ],
          data: students.map(s => ({
            name: s.name,
            class: s.class,
            section: s.section,
            gender: s.gender,
            contactNo: s.contactNo,
            email: s.email,
            dateOfBirth: s.dateOfBirth.getFullYear(),
          })),
        },
        res,
      );
    })
    .catch(err => {
      res.status(500).json({ studnets: 'Error getting students' });
    });
});

// @route PUT /api/students
// @desc update new student profile
// @desc Private
router.post(
  '/:id/contactperson',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateContactPersonInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    Student.findOne({ _id: req.params.id }).then(student => {
      const newContactPerson = {
        name: req.body.name,
        relation: req.body.relation,
        email: req.body.email,
        contactNo: req.body.contactNo,
      };

      //Add to exprience array
      student.contactPerson.unshift(newContactPerson);
      student.save().then(student => res.json(student));
    });
  },
);

module.exports = router;
