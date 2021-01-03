import { Student } from '../entities/Student';

export function findByName(name: string): Promise<Student[]> {
  return Student.find({ name });
}

export default findByName;
