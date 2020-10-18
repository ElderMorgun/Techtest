const os = require('os')

const Mower = require('./mower.js');
const Controller = require('./controller.js');

// index.js contains executive function of automatic lawn Mower.
module.exports.run = function run(inputData) {

    let resultData = [];

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