import { createReadStream, existsSync, ReadStream } from 'fs';
import * as fastCSV from 'fast-csv';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createStream } = require('csv-stream');

import { RotateTable } from './rotate-table';
import { CSVRawRecord, CSVRecord } from '../models/types';

export class CSVProcessor {
  private outputStream!: fastCSV.CsvFormatterStream<fastCSV.FormatterRow, fastCSV.FormatterRow>;
  private readonly columns = ['id', 'json'];

  
  /**
   * Return full file path
   * @date 04/01/2023 - 15:22:07
   *
   * @private
   * @param {string} filename
   * @returns {*}
   */
  private getFilePath(filename: string) {
    return path.join(__dirname, '../', filename);
  }

  
  /**
   * Creates an instance of CSVProcessor.
   * @date 04/01/2023 - 15:22:23
   *
   * @constructor
   * @param {RotateTable} rotateTable
   */
  constructor(public rotateTable: RotateTable) {
    this.outputStream = fastCSV.format({ headers: true });
    this.outputStream.pipe(process.stdout).on('end', () => process.exit());
  }

  public validateFile(fullFilePath: string) {
    const isCSV = /(\.csv)$/.test(fullFilePath);
    if (!isCSV) {
      throw Error('File must have csv extension');
    }

    const fileExists = existsSync(fullFilePath);
    if (!fileExists) {
      throw Error('File does not exist');
    }
  }
  
  /**
   * Read and write CSV stream line by line
   * @date 04/01/2023 - 15:21:50
   *
   * @private
   * @async
   * @param {string} fullFilePath
   * @returns {Promise<boolean>}
   */
  private async parseAndStream(fullFilePath: string): Promise<boolean> {
    const inputStream = createReadStream(fullFilePath);
    const options = {
      columns: this.columns,
      escapeChar: '"',
      enclosedChar: '"',
    };

    const csvStream = createStream(options);
    const stream: ReadStream = inputStream.pipe(csvStream);
    stream.on('data', (data: CSVRawRecord) => {
      // skip first row with column name
      if (data.id === this.columns[0]) {
        return;
      }

      const csvRecord: CSVRecord = {
        id: parseInt(data.id, 10),
        json: JSON.parse(data.json) as number[],
      };

      const result = this.rotateTable.execute(csvRecord);
      // write each line to the output stream
      this.outputStream.write(result);
    });

    const result = new Promise((resolve: (isComplete: boolean) => void, reject: (err: Error) => void) => {
      stream.on('end', () => {
        this.outputStream.end();
        resolve(true);
      });

      stream.on('error', (error: Error) => {
        reject(error);
      });
    });

    return result;
  }
  
  
  /**
   * Executes the class's use case
   * @date 04/01/2023 - 15:22:41
   *
   * @public
   * @async
   * @param {string} filename
   * @returns {*}
   */
  public async execute(filename: string) {
    const fullFilePath = this.getFilePath(filename);
    // validate the CSV file
    this.validateFile(fullFilePath);

    // read and write csv data stream
    await this.parseAndStream(fullFilePath);
  }
}