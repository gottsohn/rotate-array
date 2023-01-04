import { CSVProcessor } from './csv-processor';


/**
 * Process the command line arguments
 * @date 04/01/2023 - 15:25:58
 *
 * @export
 * @class ArgumentProcessor
 * @typedef {ArgumentProcessor}
 */
export class ArgumentProcessor {
  public static CLI_INVALID_ARGS = 'Invalid arguments. Type --help for usage';
  constructor(private csvProcessor: CSVProcessor) { }

  public async execute(args: string[]) {
    const arg = args[2];
    if (args.length > 3 || !arg) {
      console.log(ArgumentProcessor.CLI_INVALID_ARGS);
    } else {
      await this.csvProcessor.execute(arg);
    }
  }
}