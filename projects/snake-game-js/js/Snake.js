export const SnakeDirection = Object.freeze({
    UP: Symbol("up"),
    DOWN: Symbol("down"),
    LEFT: Symbol("left"),
    RIGHT: Symbol("right")
});

export class Snake {
    #growing;
    #positions;
    #direction;

    constructor(initialPositions, initialDirection) {
        this.#growing = false;
        this.#positions = initialPositions;
        this.#direction = initialDirection;
    }

    get getPositions() {
        return this.#positions;
    }

    set setDirection(direction) {
        let rDiff = this.#positions[0][0] - this.#positions[1][0];
        let cDiff = this.#positions[0][1] - this.#positions[1][1];

        if(direction === SnakeDirection.UP && rDiff > 0) return;
        if(direction === SnakeDirection.DOWN && rDiff < 0) return;
        if(direction === SnakeDirection.LEFT && cDiff > 0) return;
        if(direction === SnakeDirection.RIGHT && cDiff < 0) return;

        this.#direction = direction;
    }

    getHeadPosition() {
        return this.#positions[0];
    }

    getTailPosition() {
        return this.#positions[this.#positions.length - 1];
    }

    grow() {
        this.#growing = true;
    }

    move() {
        let newPosition;
        if(this.#direction === SnakeDirection.DOWN) {
            newPosition = [this.#positions[0][0] + 1, this.#positions[0][1]];
        }

        if(this.#direction === SnakeDirection.UP) {
            newPosition = [this.#positions[0][0] - 1, this.#positions[0][1]];
        }

        if(this.#direction === SnakeDirection.LEFT) {
            newPosition = [this.#positions[0][0], this.#positions[0][1] - 1];
        }

        if(this.#direction === SnakeDirection.RIGHT) {
            newPosition = [this.#positions[0][0], this.#positions[0][1] + 1];
        }

        this.#positions.unshift(newPosition);

        if(this.#growing) {
            this.#growing = false;
        } else {
            this.#positions.pop();
        }
        return this.#positions;
    }
}