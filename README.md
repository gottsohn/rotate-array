### Rotate Array CLI
The CSV input is read and processed line by line.
Each CSV line is read, processed and streamed out, irrespective of the previous or the next line.
This makes the process more efficientm, saving system memory in the case of large file to be processing.

### Github Actions
 - Check the github actions to see the CI pipeline gengerated for this project

### Setup
 - Node v18 or newer is required to run project
 - Run `npm install` from the project directory


### Testing
 - Run `npm test` from the project directory
 - Coverage covers all `.ts` files in application directory (exluding typings)
 - Browse test coverage [here](./coverage/unit/lcov-report/index.html)
 - The unit test cover cases of 1, 2, 3, 4 and 6 square tables and an invalid tables as a bonus ;)
 

### Building
- The entry point as defined in `package.json` is **cli.js** transpiled from **cli.ts**
- To transpile from typescript to javascript, run `npm run build` from project directory. 
- The build creates the `.js` files in same directory as the transpiled `.ts` files, to **meet specifications**

### Running
 - To run the project and ouput the CSV, place the input csv in project directory and run the the following in your command line `node cli.js input.csv > output.csv`
 


### Suggestions
Using this guide, the cli application can be added to the system binary to make the it conventional. 

- Make the cli script global using: `npm install -g .`
- And run this from the command line anywhere using: `rotate input.csv > output.csv`

Checkout the bin configuration in line 14 [here](./package.json).