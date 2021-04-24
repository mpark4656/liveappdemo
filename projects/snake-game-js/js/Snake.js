export const SnakeDirection = Object.freeze({
    UP: Symbol("up"),
    DOWN: Symbol("down"),
    LEFT: Symbol("left"),
    RIGHT: Symbol("right")
});

export class Snake {
    #growing;
    #positions;

    constructor(initialPositions) {
        this.#growing = false;
        this.#positions = initialPositions;
    }

    get getPositions() {
        return this.#positions;
    }

    grow() {
        this.#growing = true;
    }

    move(snakeDirection) {
        let newPosition;
        if(snakeDirection === SnakeDirection.DOWN) {
            newPosition = [this.#positions[0][0] + 1, this.#positions[0][1]];
        }

        if(snakeDirection === SnakeDirection.UP) {
            newPosition = [this.#positions[0][0] - 1, this.#positions[0][1]];
        }

        if(snakeDirection === SnakeDirection.LEFT) {
            newPosition = [this.#positions[0][0], this.#positions[0][1] - 1];
        }

        if(snakeDirection === SnakeDirection.RIGHT) {
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