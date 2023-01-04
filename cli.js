#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// istanbul ignore file
const argument_processor_1 = require("./utils/argument-processor");
const csv_processor_1 = require("./utils/csv-processor");
const rotate_table_1 = require("./utils/rotate-table");
const handler = async () => {
    const rotateTable = new rotate_table_1.RotateTable();
    const csvProcessor = new csv_processor_1.CSVProcessor(rotateTable);
    const argumentProcessor = new argument_processor_1.ArgumentProcessor(csvProcessor);
    await argumentProcessor.execute(process.argv);
};
handler();
