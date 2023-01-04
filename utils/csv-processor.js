"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVProcessor = void 0;
const fs_1 = require("fs");
const fastCSV = require("fast-csv");
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createStream } = require('csv-stream');
class CSVProcessor {
    /**
     * Return full file path
     * @date 04/01/2023 - 15:22:07
     *
     * @private
     * @param {string} filename
     * @returns {*}
     */
    getFilePath(filename) {
        return path.join(__dirname, '../', filename);
    }
    /**
     * Creates an instance of CSVProcessor.
     * @date 04/01/2023 - 15:22:23
     *
     * @constructor
     * @param {RotateTable} rotateTable
     */
    constructor(rotateTable) {
        this.rotateTable = rotateTable;
        this.columns = ['id', 'json'];
        this.outputStream = fastCSV.format({ headers: true });
        this.outputStream.pipe(process.stdout).on('end', () => process.exit());
    }
    validateFile(fullFilePath) {
        const isCSV = /(\.csv)$/.test(fullFilePath);
        if (!isCSV) {
            throw Error('File must have csv extension');
        }
        const fileExists = (0, fs_1.existsSync)(fullFilePath);
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
    async parseAndStream(fullFilePath) {
        const inputStream = (0, fs_1.createReadStream)(fullFilePath);
        const options = {
            columns: this.columns,
            escapeChar: '"',
            enclosedChar: '"',
        };
        const csvStream = createStream(options);
        const stream = inputStream.pipe(csvStream);
        stream.on('data', (data) => {
            // skip first row with column name
            if (data.id === this.columns[0]) {
                return;
            }
            const csvRecord = {
                id: parseInt(data.id, 10),
                json: JSON.parse(data.json),
            };
            const result = this.rotateTable.execute(csvRecord);
            // write each line to the output stream
            this.outputStream.write(result);
        });
        const result = new Promise((resolve, reject) => {
            stream.on('end', () => {
                this.outputStream.end();
                resolve(true);
            });
            stream.on('error', (error) => {
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
    async execute(filename) {
        const fullFilePath = this.getFilePath(filename);
        // validate the CSV file
        this.validateFile(fullFilePath);
        // read and write csv data stream
        await this.parseAndStream(fullFilePath);
    }
}
exports.CSVProcessor = CSVProcessor;
