import {Cell, CellContent} from "./Cell.js"
import {Snake, SnakeDirection} from "./Snake.js"

export class Game {
    #board;
    #boardSize;
    #snake;
    #snakeDirection;
    #foodPosition;

    constructor(board_size = 8, initialSnakePositions, snakeDirection = SnakeDirection.RIGHT) {
        this.#boardSize = board_size;
        this.#snakeDirection = snakeDirection;
        this.#snake = new Snake(initialSnakePositions);
        this.#initBoard();
        this.#replaceSnake(this.#snake.getPositions);
        this.#createFood();
    }

    #initBoard() {
        this.#board = [];
        for(let i = 0; i < this.#boardSize; i++) {
            let row = [];
            for(let j = 0; j < this.#boardSize; j++) {
                row.push(new Cell());
            }
            this.#board.push(row);
        }
    }

    #replaceSnake(snakePositions) {
        this.#clearCellByContent(CellContent.SNAKE);
        for(let i = 0; i < snakePositions.length; i++) {
            let row = snakePositions[i][0];
            let col = snakePositions[i][1];
            this.#board[row][col].setCellContent = CellContent.SNAKE;
        }
    }

    #clearCellByContent(cellContent) {
        for(let i = 0; i < this.#boardSize; i++) {
            let row = [];
            for(let j = 0; j < this.#boardSize; j++) {
                if(this.#board[i][j].getCellContent === cellContent) {
                    this.#board[i][j].setCellContent = CellContent.EMPTY;
                }
            }
            this.#board.push(row);
        }
    }

    get getBoard() {
        return this.#board;
    }

    set setSnakeDirection(snakeDirection) {
        if(snakeDirection === SnakeDirection.DOWN && this.#snakeDirection === SnakeDirection.UP) return;
        if(snakeDirection === SnakeDirection.UP && this.#snakeDirection === SnakeDirection.DOWN) return;
        if(snakeDirection === SnakeDirection.LEFT && this.#snakeDirection === SnakeDirection.RIGHT) return;
        if(snakeDirection === SnakeDirection.RIGHT && this.#snakeDirection === SnakeDirection.LEFT) return;
        this.#snakeDirection = snakeDirection;
    }

    #createFood() {
        this.#clearCellByContent(CellContent.FOOD);
        let possiblePositions = [];
        for(let i = 0; i < this.#board.length; i++) {
            for(let j = 0; j < this.#board[i].length; j++) {
                if(this.#board[i][j].getCellContent === CellContent.EMPTY) {
                    possiblePositions.push([i, j]);
                }
            }
        }
        this.#foodPosition = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        this.#board[this.#foodPosition[0]][this.#foodPosition[1]].setCellContent = CellContent.FOOD;
    }

    moveSnake() {
        let newPositions = this.#snake.move(this.#snakeDirection);

        if(!this.#isOffBoard() && !this.#isRecentMoveInvalid()) {
            this.#replaceSnake(newPositions);
        }

        if(newPositions[0][0] === this.#foodPosition[0] && newPositions[0][1] === this.#foodPosition[1]) {
            this.#snake.grow();
            this.#createFood();
        }
    }

    isGameOver() {
        return this.#isOffBoard() || this.#isRecentMoveInvalid();
    }

    #isOffBoard() {
        for(let i = 0; i < this.#snake.getPositions.length; i++) {
            if(this.#snake.getPositions[i][0] < 0 || this.#snake.getPositions[i][0] >= this.#boardSize) return true;
            if(this.#snake.getPositions[i][1] < 0 || this.#snake.getPositions[i][1] >= this.#boardSize) return true;
        }
        return false;
    }

    #isRecentMoveInvalid() {
        let recentMove = this.#snake.getPositions[0];
        for(let i = 1; i < this.#snake.getPositions.length; i++) {
            if(recentMove[0] === this.#snake.getPositions[i][0] &&
                recentMove[1] === this.#snake.getPositions[i][1]
            ) return true;
        }
        return false;
    }
}