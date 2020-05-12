const { Factory } = require('rosie');
const faker = require('faker');

const { name, internet, random } = faker;

const userFactory = new Factory().attrs({
  uuid: () => random.uuid(),
  name: () => name.findName(),
  email: () => internet.email(),
  avatar: () => internet.avatar(),
});

async function userPopulator(userModel) {
  const users = userFactory.buildList(10);

  const saveUsers = users.map(user => {
    const userData = userModel.build(user);
    return userData.save();
  });

  return Promise.all(saveUsers);
}

module.exports = userPopulator;
