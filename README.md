### Rotate Array CLI
The CSV input is read and processed line by line.
Each CSV line is read, processed and streamed out, irrespective of consequitive lines.
This make the process more efficient by saving system memory in the cases of larger files to be processed.

### Setup
 - Node v18 or newer is required to run project
 - Run `npm install` from the project directory


### Testing
 - Run `npm test` from the project directory
 - Coverage covers all `.ts` files in application directory (exluding typings)
 - Browse test coverage [here](./coverage/unit/lcov-report/index.html)
 - The unit test cover cases of 1, 2, 3, 4 and 6 square tables and an invalid tables as a bonus ;)
 

### Building
- To transpile from typescript to javascript, run `npm run build` from project directory. 
- The build creates the `.js` files in same directory as the transpiled `.ts` files, to meet specifications

### Running
 - To run the project and ouput the CSV, place the input csv in project directory and run the the following in your command line `node cli.js input.csv > output.csv`
 


### Suggestions
Using this guide, the cli application can be added to the system binary to make the it conformal. 

- Make the output file global using: `npm install -g .`
- And run this from the command line anywhere using: `rotate input.csv > output.csv`

Checkout the bin configuration in line 14 [here](./package.json).