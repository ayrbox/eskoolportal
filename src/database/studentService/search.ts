import { Student } from "../entities/Student";

export function search(searchText: string): Promise<Student[]> {
  const searchTerm = {
    term: `%${searchText}%`,
  };

  return Student.createQueryBuilder()
    .select()
    .where("name ILIKE :term", searchTerm)
    .orWhere("address ILIKE :term", searchTerm)
    .orWhere('"contactNo" ILIKE :term', searchTerm)
    .orWhere("email ILIKE :term", searchTerm)
    .orWhere('"referenceCode" ILIKE :term', searchTerm)
    .getMany();
}

export default search;
