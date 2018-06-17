const express = require("express");

const router = express.Router();

// @route GET api/students/test
// @desc Test of student
// @access Public
router.get("/test", (req, res) => res.json({ message: "Students works" }));



router.get('/students', (req, res) => {
    res.json({'students': 'listo fo students'});
})

module.exports = router;
