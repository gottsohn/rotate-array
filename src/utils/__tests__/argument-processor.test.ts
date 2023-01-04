import { ArgumentProcessor } from '../argument-processor';
import { CSVProcessor } from '../csv-processor';
import { RotateTable } from '../rotate-table';

describe('Argument Processor', () => {
  const rotateTable = new RotateTable();
  const csvProcessor = new CSVProcessor(rotateTable);
  describe('#processArguments', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should process the csv', () => {
      jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
      const args = ['a', 'b', 'input.csv'];
      const argumentProcessor = new ArgumentProcessor(csvProcessor);
      argumentProcessor.execute(args);

      expect(console.log).not.toHaveBeenCalled();
    });

    it('should log "Invalid arguments" for missing arguments', () => {
      jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
      const argumentProcessor = new ArgumentProcessor(csvProcessor);
      const args = ['a', 'b'];
      argumentProcessor.execute(args);

      expect(console.log).toHaveBeenCalledWith(ArgumentProcessor.CLI_INVALID_ARGS);
    });

    it('should log "Invalid arguments" for too marny arguments', async () => {
      jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());
      const argumentProcessor = new ArgumentProcessor(csvProcessor);
      const args = ['a', 'b', 'c', 'd'];
      await argumentProcessor.execute(args);

      expect(console.log).toHaveBeenCalledWith(ArgumentProcessor.CLI_INVALID_ARGS);
    });
  });
});
