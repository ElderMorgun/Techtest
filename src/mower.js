const DIRECTIONS = ['N', 'E', 'S', 'W'];

// Mower class description. It describes lawn size and position of Mower on that.
module.exports = class Mower {
    constructor(lawn, initialPosition) {

        const [xLength, yLength] = lawn.split(/\s+/).map((curr) => Number(curr));
        const [x, y, currDirection] = initialPosition.toUpperCase().split(/\s+/);

        this.lawn = {
            xLength,
            yLength,
        }

        this.coordinates = {
            x: Number(x),
            y: Number(y),
            currDirection: currDirection
        }
    }

    // Return the current position of the Mower on the lawn and its orientation
    get position() {
        return `${this.coordinates.x} ${this.coordinates.y} ${this.coordinates.currDirection}`;
    }

    // Method checks the initial Mower position on the lawn by default or its next moves.
    checkPosition(x = this.coordinates.x, y = this.coordinates.y) {
        return (x >= 0 && x <= this.lawn.xLength && y >= 0 && y <= this.lawn.yLength)
    }

    // Method accepts 'R' or 'L' as parameter and turns mower to the right or left.
    // 'R' parameter switches direction to the next array element.
    // 'L' parameter switches direction to the previous array element.
    // If the parameter is not recognized, method prints error in the console.
    turn(side) {
        let index = DIRECTIONS.indexOf(this.coordinates.currDirection)
        if (side === 'R' && index != -1) {
            index < DIRECTIONS.length - 1 ?
                this.coordinates.currDirection = DIRECTIONS[index + 1] :
                this.coordinates.currDirection = DIRECTIONS[0];
        } else if (side === 'L' && index != -1) {
            index > 0 ?
                this.coordinates.currDirection = DIRECTIONS[index - 1] :
                this.coordinates.currDirection = DIRECTIONS[DIRECTIONS.length - 1];
        } else {
            console.log(`Error: Try to turn ${side}! Wrong turn command!`)
        }
    }

    // Method moves Mower forward to a next cell if the Mower is not going to move out of the borders.
    // Current Direction can be one of the cardinal directions (North, East, South, West).
    // Method displays error if this.coordinates.currDirection is not equal to any elements of DIRECTIONS.
    moveForward() {
        switch (this.coordinates.currDirection) {
            case DIRECTIONS[0]:
                if (this.checkPosition(this.coordinates.x, this.coordinates.y + 1)) {
                    this.coordinates.y += 1
                }
                break;
            case DIRECTIONS[1]:
                if (this.checkPosition(this.coordinates.x + 1, this.coordinates.y)) {
                    this.coordinates.x += 1
                }
                break;
            case DIRECTIONS[2]:
                if (this.checkPosition(this.coordinates.x, this.coordinates.y - 1)) {
                    this.coordinates.y -= 1
                }
                break;
            case DIRECTIONS[3]:
                if (this.checkPosition(this.coordinates.x - 1, this.coordinates.y)) {
                    this.coordinates.x -= 1
                }
                break;
            default:
                console.log(`Error: There's no direction to move! currentDirection is ${this.coordinates.currDirection}`)
        }
    }

}