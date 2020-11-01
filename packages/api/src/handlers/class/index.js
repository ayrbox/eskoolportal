const { Class } = require("../../models");

const makeClassListHandler = require("./makeClassListHandler");

const classList = makeClassListHandler({
  Class
});

module.exports = {
  classList,
  getClassHandler: async (req, res) => {
    const { id } = req.params;

    const c = await Class.findByPk(id);

    if (!c) {
      return res.status(404).send({
        message: `Class not found for id ${id}`
      });
    }

    res.send(c);
  }
};
