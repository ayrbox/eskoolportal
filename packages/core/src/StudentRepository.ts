import { EntityRepository, Repository } from 'typeorm';
import { Student } from './entities/Student';

@EntityRepository(Student)
export class UserRepository extends Repository<Student> {
  findById(id: string): Promise<Student | undefined> {
    return Student.findOne(id);
  }

  findByName(name: string) {
    return this.findOne({ name });
  }

  /**
   * Create and return student
   * @param student {Student} Student Entity
   */
  createStudent(student: Student): Promise<Student> {
    return this.save(student);
  }

  /**
   * Updates students details
   * @param student
   */
  async updateStudent(student: Student): Promise<boolean> {
    try {
      const updateResult = await Student.update(student.id, student);
      console.log(updateResult);
      return true;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Returns list of students by classId and sectionid
   * @param classId
   * @param sectionId
   */
  findByClass(classId?: string, sectionId?: string): Promise<Student[]> {
    return Student.find({
      where: {
        classId,
        sectionId,
      },
    });
  }

  /**
   * Search student in different fields.
   * @param searchText
   */

  async search(searchText: string): Promise<Student[]> {
    const searchTerm = {
      term: `%${searchText}%`,
    };

    return await this.createQueryBuilder()
      .select()
      .where('name ILIKE :term', searchTerm)
      .orWhere('address ILIKE :term', searchTerm)
      .orWhere('contactNo ILIKE :term', searchTerm)
      .orWhere('email ILIKE :term', searchTerm)
      .orWhere('referenceCode ILIKE :term', searchTerm)
      .getMany();
  }
}
