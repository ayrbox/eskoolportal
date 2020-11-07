/**
 * https://github.com/vercel/next.js/blob/canary/examples/with-passport-and-next-connect/lib/passport.js
 */

import passport from "passport";
import LocalStrategy from "passport-local";
import db from "@eskoolportal/api/src/models";

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.email);
});

passport.deserializeUser(function (req, email, done) {
  // deserialize the username back into user object
  const user = { hello: "admin@eskoolportal.com", password: "Passw0rd!23" }; //findUserByUsername(req, username);
  db.User.findOne({
    where: {
      email,
    },
  }).then((user) => {
    if (!user) {
      done(false, null);
      return;
    }
    done(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, email, password, done) => {
      if (!email || !password) {
        done("Email and password required", null);
        return;
      }
      db.User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (!user) {
          done("User not found", null);
          return;
        }
        user.isPasswordValid(password).then((valid) => {
          if (!valid) {
            done("Email and password do not match", null);
            return;
          }
          const { id, name, email, avatar } = user;
          done(null, { id, name, email, avatar });
        });
      });
    }
  )
);

export default passport;
