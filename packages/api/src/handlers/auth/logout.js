const logout = function () {
  return function (req, res) {
    req.logout();
    req.session.destroy();
    return res.end(
      JSON.stringify({ status: "success", message: "Logged out" })
    );
  };
};

module.exports = logout;
