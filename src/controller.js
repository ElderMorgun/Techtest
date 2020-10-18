// Controller class description. It describes operation program of Mower, received a sequence of letters to control Mower
module.exports = class Controller {
    constructor(mower, commands) {
        this.mower = mower
        this.commands = commands.toUpperCase().split('');
    }

    // Method executes the program with commands 'R', 'L', 'F'.
    // It check the start position of Mower on the lawn. If it's inside – operates the commands, if it's outside – deletes coordinates.
    // Operator 'F' runs moveForward() method of Mower and move it to the next cell.
    // Operators 'R' and 'L' run turn() method of Mower and rotate of 90° respectively to the left or to the right.
    exec() {
        if (this.mower.checkPosition()) {
            this.commands.forEach(command => {
                command === 'F' ?
                    this.mower.moveForward() :
                    this.mower.turn(command)
            })
        } else {
            delete this.mower.coordinates
        }
    }
}