import { search } from './search';

import { Student } from '../entities/Student';

Student.createQueryBuilder = jest.fn(() => {
  throw new Error('fuk yea');
});

describe('Student Service <studentService.ts>', () => {
  describe('Search', () => {
    it('should return list of studnes', async () => {
      const result = await search('test');
      console.log(result);
    });
  });
});
