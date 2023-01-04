"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVProcessor = void 0;
const fs_1 = require("fs");
const fastCSV = require("fast-csv");
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createStream } = require('csv-stream');
class CSVProcessor {
    getFilePath(filename) {
        return path.join(__dirname, '../', filename);
    }
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
    async execute(filename) {
        const fullFilePath = this.getFilePath(filename);
        // validate the CSV file
        this.validateFile(fullFilePath);
        // read and write csv data stream
        await this.parseAndStream(fullFilePath);
    }
}
exports.CSVProcessor = CSVProcessor;
