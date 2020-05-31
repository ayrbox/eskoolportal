const passport = require("passport");
module.exports = ({ User }) => {
  return function (req, res) {
    passport.authenticate("local", (err, user) => {
      if (err) {
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            status: "error",
            message: err
          })
        );
        return;
      }

      if (!user) {
        res.statusCode = 401;
        res.end(
          JSON.stringify({
            status: "error",
            message: "Email or password do not match."
          })
        );
        return;
      }

      req.login(user, err => {
        if (err) {
          res.statusCode = 500;
          res.end(
            JSON.stringify({
              status: "error",
              message: err
            })
          );
          return;
        }

        return res.end(
          JSON.stringify({
            status: "success",
            message: "Logged in"
          })
        );
      });
    })(req, res);
  };
};
