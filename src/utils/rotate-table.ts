import { CSVOutput, CSVRecord } from '../interfaces/index';

interface RotateTableResult {
  result: number[];
  isValid: boolean;
}

export class RotateTable {

  /**
   * Checks if a number is an integer
   * @date 04/01/2023 - 15:22:59
   *
   * @private
   * @param {number} num
   * @returns {boolean}
   */
  private isValid(num: number) {
    return Number(num) === num && num % 1 === 0;
  }

  
  /**
   * Calculates and returns the new index of an item in the array
   * @date 04/01/2023 - 15:23:42
   *
   * @public
   * @param {number} index
   * @param {number} root
   * @param {number} size
   * @returns {number}
   */
  public getNewIndex(index: number, root: number, size: number) {
    let newIndex = index;
    switch (true) {
    case index + 1 < root:
      newIndex = index + 1;
      break;
    case size - index < root && index % root !== 0:
      newIndex = index - 1;
      break;
    case index > 0 && index % root === 0:
      newIndex = index - root;
      break;
    case (index + 1) % root === 0 && index + 1 < size:
      newIndex = index + root;
      break;
    }

    return newIndex;
  }

  
  /**
   * Rotate a table and its child table clockwise when its a square
   * @date 04/01/2023 - 15:24:12
   *
   * @private
   * @param {number[]} table
   * @returns {RotateTableResult}
   */
  private rotateTable(table: number[]): RotateTableResult {
    const root = Math.sqrt(table.length);
    const isValid = this.isValid(root);
    if (!isValid) {
      return {
        result: [],
        isValid,
      };
    }

    const size = table.length;
    const result: number[] = new Array(size);
    const childIndicies: number[] = [];
    const childTable: number[] = [];
    
    for (let i = 0; i < size; i++) {
      const newIndex = this.getNewIndex(i, root, size);
      if (i === newIndex) {
        childIndicies.push(i);
        childTable.push(table[i]);
      }

      result[newIndex] = table[i];
    }

    // using recursion to process child tables that match the square criteria
    if (childTable.length < table.length) {  
      const { result: childResult } = this.rotateTable(childTable);
      childIndicies.forEach((i, index) => {
        result[i] = childResult[index];
      });
    }

    return {
      result,
      isValid,
    };
  }

  
  /**
   * Executes the class's use case
   * @date 04/01/2023 - 15:25:06
   *
   * @public
   * @param {CSVRecord} { id, json }
   * @returns {CSVOutput}
   */
  public execute({ id, json }: CSVRecord): CSVOutput {
    const { result, isValid } = this.rotateTable(json);
    const tableAsString = JSON.stringify(result);
    // space out result to match literal example
    const formatedTable = tableAsString.replace(/,/g, ', ');

    return {
      id,
      json: formatedTable,
      is_valid: isValid,
    };
  }
}
