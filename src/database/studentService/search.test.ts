import { search } from "./search";

import { Student } from "../entities/Student";

Student.createQueryBuilder = jest.fn(() => {
  return [new Student(), new Student()];
});

describe("Student Service <studentService.ts>", () => {
  describe("Search", () => {
    it("should return list of studnes", async () => {
      const result = await search("test");
      console.log(result);
      expect(result).toBeTruthy();
    });
  });
});
