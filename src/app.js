const os = require('os')
const fs = require('fs')

const Mower = require('./mower.js');
const Controller = require('./controller.js');

// app.js contains executive function for number of automatic lawn Mower.
module.exports.run = function run(inputData = fs.readFileSync('./src/input.txt', 'utf-8')) {
    
    let resultData = [];
    //split input data by new line character
    inputData = inputData.split(os.EOL);
    // Get lawn size from input data
    const lawn = inputData[0];

    // Sequential launch each Mower and run automatic lawn Mower program.
    for (let i = 1; i < inputData.length; i += 2) {

        // Get initial position and driving instruction from input data
        const initialPosition = inputData[i];
        const commands = inputData[i + 1];

        // Run Mower and start program execution
        const mower = new Mower(lawn, initialPosition);
        const mowerController = new Controller(mower, commands);
        mowerController.exec();

        // Check the mower is on the lawn and print its position and orientation in the console.
        if (mower.coordinates) {
            resultData.push(mower.position)
        }
    }

    return resultData.join(os.EOL)
}