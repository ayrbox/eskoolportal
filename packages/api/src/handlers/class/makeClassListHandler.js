module.exports = ({
  Class,
}) => {
  return function(_, res) {
    Class.findAll().then(classes => {
      res.json(classes);
    });
  }
}
