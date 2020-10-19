const fs = require('fs');
const os = require('os');
const { expect } = require('chai');

const {run} = require('../src/app')

describe('Test input values in automative lawn mower', function () {

    // Check if the test was executed before and delete output results of previous tests.
    if (fs.existsSync('./test/OutputData.txt')) fs.unlinkSync('./test/OutputData.txt');
    // Read input data (lawn size, initial position and orientation, sequence of instruction driving the Mower)
    const inputData = fs.readFileSync('./test/InputData.txt', 'utf-8')
    // Run the application with test input
    const main = run(inputData)
    // Write output results to the external file to check test runs manually 
    fs.appendFileSync('./test/OutputData.txt', main);
    console.log(main)

    context('Outputs results after running application should be equal expected results', function () {

        const [firstExpected, secondExpected] = fs.readFileSync('./test/ExpectedResults.txt', 'utf-8').split(os.EOL);
        const [firstResult, secondResult] = main.split(os.EOL)

        it('Check the final position of first mower', function () {
            expect(firstResult).to.eq(firstExpected)
        });

        it('Check the final position of second mower', function () {
            expect(secondResult).to.eq(secondExpected)
        });
    });

});