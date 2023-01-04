import { CSVProcessor } from '../csv-processor';
import { RotateTable } from '../rotate-table';

describe('CSV Processor', () => {
  const rotateTable = new RotateTable();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#execute', () => {
    it('show parse the csv data and call rotate table', async () => {
      const csvProcessor = new CSVProcessor(rotateTable);
      jest.spyOn(csvProcessor['rotateTable'], 'execute');
      jest.spyOn(csvProcessor['outputStream'], 'write');
      const filename = 'input.csv';
      await csvProcessor.execute(filename);

      expect(csvProcessor['rotateTable'].execute).toHaveBeenCalled();
      expect(csvProcessor['outputStream'].write).toHaveBeenCalled();
    })
  });

  describe('#validateFile', () => {
    it('should not throw error', () => {
      jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
      const csvProcessor = new CSVProcessor(rotateTable);
      const fullFilePath = csvProcessor['getFilePath']('input.csv');

      expect(() => csvProcessor['validateFile'](fullFilePath)).not.toThrowError();
    });

    it('should throw error if file does not exist', () => {
      jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
      const csvProcessor = new CSVProcessor(rotateTable);
      const fullFilePath = csvProcessor['getFilePath']('non-existent-file.csv');

      expect(() => csvProcessor['validateFile'](fullFilePath)).toThrowError('File does not exist');
    });

    it('should throw error if file does not have csv extension', () => {
      jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
      const csvProcessor = new CSVProcessor(rotateTable);
      const fullFilePath = csvProcessor['getFilePath']('input.xlst');

      expect(() => csvProcessor['validateFile'](fullFilePath)).toThrowError('File must have csv extension');
    });
  });
});
