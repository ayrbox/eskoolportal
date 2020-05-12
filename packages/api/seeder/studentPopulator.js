const { Factory } = require('rosie');
const faker = require('faker');

const { name, internet, random, date, address, phone } = faker;

const studentFactory = new Factory().attrs({
  name: () => name.findName(),
  dateOfBirth: () => date.past(4),
  gender: () => random.arrayElement(['Male', 'Female']),
  address: () => address.streetName(),
  contactNo: () => phone.phoneNumber(),
  email: () => internet.email(),
  joinDate: () => date.past(),
  class: '-',
  section: '-',
  classRollNo: () => random.number(),
  referenceCode: () => random.alphaNumeric(),
});

const CLASS_SIZE = 30;
const CLASS_NAMES = ['Nursery', 'JKG', 'SKG', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const CLASS_SECTIONS = ['A', 'B', 'C'];

async function studentPopulator(userModel) {
  const saveStudents = [];

  CLASS_NAMES.forEach(class_ => {
    CLASS_SECTIONS.forEach(section => {
      const students = studentFactory.buildList(CLASS_SIZE, {
        class: class_,
        section,
      });
      students.forEach(student => {
        const studentData = userModel.build(student);
        saveStudents.push(studentData.save());
      });
    });
  });

  return Promise.all(saveStudents);
}
module.exports = studentPopulator;
