import { Student } from '../entities/Student';

export function findById(id: string): Promise<Student | undefined> {
  return Student.findOne(id);
}

export default findById;
