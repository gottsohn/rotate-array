"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentProcessor = void 0;
class ArgumentProcessor {
    constructor(csvProcessor) {
        this.csvProcessor = csvProcessor;
    }
    async execute(args) {
        const arg = args[2];
        if (args.length > 3 || !arg) {
            console.log(ArgumentProcessor.CLI_INVALID_ARGS);
        }
        else {
            await this.csvProcessor.execute(arg);
        }
    }
}
exports.ArgumentProcessor = ArgumentProcessor;
ArgumentProcessor.CLI_INVALID_ARGS = 'Invalid arguments. Type --help for usage';
