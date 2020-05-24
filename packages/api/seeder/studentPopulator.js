const { Factory } = require("rosie");
const faker = require("faker");

const { name, internet, random, date, address, phone } = faker;

const studentFactory = new Factory().attrs({
  name: () => name.findName(),
  dateOfBirth: () => date.past(4),
  gender: () => random.arrayElement(["Male", "Female"]),
  address: () => address.streetName(),
  contactNo: () => phone.phoneNumber(),
  email: () => internet.email(),
  joinDate: () => date.past(),
  classId: -1,
  sectionId: -1,
  classRollNo: () => random.number(),
  referenceCode: () => random.alphaNumeric()
});

const CLASS_SIZE = 30;

async function studentPopulator(userModel, classModel, sectionModel) {
  const classes = await classModel.findAll();
  const sections = await sectionModel.findAll();

  const saveStudents = [];
  classes.forEach(class_ => {
    sections.forEach(section => {
      const students = studentFactory.buildList(CLASS_SIZE, {
        classId: class_.id,
        sectionId: section.id
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
