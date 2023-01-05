// istanbul ignore file
import { ArgumentProcessor } from './utils/argument-processor';
import { CSVProcessor } from './utils/csv-processor';
import { RotateTable } from './utils/rotate-table';


/**
 * Entry point of application to process command line arguments
 * @date 04/01/2023 - 15:27:14
 *
 * @async
 * @returns {*}
 */
const handler = async () => {
  const rotateTable = new RotateTable();
  const csvProcessor = new CSVProcessor(rotateTable);
  const argumentProcessor = new ArgumentProcessor(csvProcessor);

  await argumentProcessor.execute(process.argv);
};

handler();