const passport = require("passport");
const strategy = require("passport-local").Strategy;

const passportMiddleware = function (User) {
  passport.use(
    new strategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async function (email, password, done) {
        if (!email || !password) {
          done("Email and password required", null);
          return;
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
          done("User not found", null);
          return;
        }

        const valid = await user.isPasswordValid(password);

        if (!valid) {
          done("Email and password do not match", null);
          return;
        }

        done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    User.findOne({
      where: {
        email
      }
    }).then(user => {
      done(null, user);
    });
  });

  return passport;
};

module.exports = passportMiddleware;
