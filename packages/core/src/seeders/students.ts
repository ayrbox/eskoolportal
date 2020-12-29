import { Factory } from 'rosie';
import { name, random, internet, date, address, phone } from 'faker';
import { BaseEntity } from 'typeorm';
import { Student } from '../entities/Student';
import { Class } from '../entities/Class';
import { Section } from '../entities/Section';

const studentFactory = new Factory().attrs({
  id: () => random.uuid(),
  name: () => name.findName(),
  dateOfBirth: () => date.past(4),
  gender: () => random.arrayElement(['male', 'female']),
  address: () => address.streetName(),
  contactNo: () => phone.phoneNumber(),
  email: () => internet.email(),
  joinDate: () => date.past(),
  classId: undefined,
  sectionId: undefined,
  rollno: () => random.number(),
  referenceCode: () => random.alphaNumeric(5).toUpperCase(),
  createdAt: () => new Date(),
  updatedAt: () => new Date(),
});

export default async function (): Promise<void> {
  const classes = await Class.find();
  const sections = await Section.find();

  classes.forEach((class_) => {
    sections.forEach(async (section) => {
      const students = studentFactory.buildList(30, {
        classId: class_.id,
        sectionId: section.id,
      }) as Student[];
      await Student.save(students);
    });
  });
}
