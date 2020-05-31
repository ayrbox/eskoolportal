const passport = require("passport");

const { User } = require("../models");

module.exports = async (req, res, next) => {
  if (!req.session.passport) {
    return res.status(403).send({
      status: "error",
      message: "Unauthorized"
    });
  }

  const userEmail = req.session.passport.user;
  req.user = await User.findOne({
    where: {
      email: userEmail
    }
  });

  next();
};
