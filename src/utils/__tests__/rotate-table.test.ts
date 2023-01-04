import { CSVRecord } from '../../interfaces';
import { RotateTable } from '../rotate-table';

const sampleCSVRecord: CSVRecord[] = [
  { id: 1, json: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { id: 2, json: [40, 20, 90, 10] },
  { id: 3, json: [-5] },
  { id: 9, json: [2, 0] },
  { id: 5, json: [2, -5, -5] },
  { id: 8, json: [1, 1, 1, 1, 1] },
];

describe('Rotate Table', () => {
  let rotateTable!: RotateTable;
  beforeEach(() => {
    rotateTable = new RotateTable();
  });

  describe('#isValid', () => {
    it('should return true for whole numbers', () => {
      expect(rotateTable['isValid'](10)).toBeTruthy();
    });

    it('should return false for floats, 3.5', () => {
      expect(rotateTable['isValid'](3.5)).toBeFalsy();
    });
  });

  describe('#getNewIndex', () => {
    it('should increase index by 1 for index 0 and array size 9', () => {
      expect(rotateTable['getNewIndex'](0, 3, 9)).toBe(1);
    });

    it('should increase index by 3 for index 5 and array size 9', () => {
      expect(rotateTable['getNewIndex'](5, 3, 9)).toBe(8);
    });

    it('should reduce index by 3 for index 3 and array size 9', () => {
      expect(rotateTable['getNewIndex'](3, 3, 9)).toBe(0);
    });

    it('should reduce index by 1 for index 7 and array size 9', () => {
      expect(rotateTable['getNewIndex'](7, 3, 9)).toBe(6);
    });
  });

  describe('#rotateTable', () => {
    it('should return empty array for non-square tables', () => {
      const { result } = rotateTable['rotateTable']([1, 2, 3]);
      expect(result).toEqual([]);
    });

    it('should rotate array of size 1', () => {
      const { result } = rotateTable['rotateTable']([1]);
      expect(result).toEqual([1]);
    });

    it('should rotate array of size 1', () => {
      const { result } = rotateTable['rotateTable']([1]);
      expect(result).toEqual([1]);
    });

    it('should rotate array of size 4', () => {
      const { result } = rotateTable['rotateTable']([1, 2, 3, 4]);
      expect(result).toEqual([3, 1, 4, 2]);
    });

    it('should rotate array of size 9', () => {
      const { result } = rotateTable['rotateTable']([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(result)
        .toEqual([4, 1, 2, 7, 5, 3, 8, 9, 6]);
    });

    it('should rotate array of size 16', () => {
      const { result } = rotateTable['rotateTable']([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      expect(result)
        .toEqual([5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12]);
    });

    it('should rotate array of size 36', () => {
      const { result } = rotateTable['rotateTable']([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36]);
      expect(result)
        .toEqual([7, 1, 2, 3, 4, 5, 13, 14, 8, 9, 10, 6, 19, 20,
          21, 15, 11, 12, 25, 26, 22, 16, 17, 18, 31, 27, 28, 29,
          23, 24, 32, 33, 34, 35, 36, 30]);
    });
  });

  describe('#execute', () => {
    it('should return the rotated csv value', () => {
      expect(rotateTable.execute(sampleCSVRecord[0])).toMatchSnapshot();
    });
  });
});
