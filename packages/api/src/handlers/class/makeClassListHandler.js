module.exports = ({ Class }) => {
  return function(_, res) {
    Class.findAll({
      order: [["order", "ASC"]]
    }).then(classes => {
      res.json(classes);
    });
  };
};
