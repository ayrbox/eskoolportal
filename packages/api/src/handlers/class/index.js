const { Class } = require('../../models');

const makeClassListHandler = require('./makeClassListHandler');

const classList = makeClassListHandler({ 
  Class,
});

module.exports = {
  classList,
};

