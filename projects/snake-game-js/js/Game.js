import {Cell, CellContent} from "./Cell.js"
import {Snake, SnakeDirection} from "./Snake.js"

export class Game {
    #board;
    #boardSize;
    #snake;
    #foodPosition;

    constructor(board_size, initialSnakePositions, initialSnakeDirection) {
        this.resetGame(board_size, initialSnakePositions, initialSnakeDirection);
    }

    resetGame(
        board_size = 10,
        initialSnakePositions = [[4, 5], [4, 4], [4, 3], [4, 2], [4, 1]],
        initialSnakeDirection = SnakeDirection.RIGHT
    )
    {
        this.#boardSize = board_size;
        this.#snake = new Snake(initialSnakePositions, initialSnakeDirection);
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
        this.#snake.setDirection = snakeDirection;
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
        let newPositions = this.#snake.move();

        if(!this.#isOffBoard() && !this.#isRecentMoveInvalid()) {
            this.#replaceSnake(newPositions);
        }

        if(newPositions[0][0] === this.#foodPosition[0] && newPositions[0][1] === this.#foodPosition[1]) {
            this.#snake.grow();
            this.#createFood();
        }
    }

    getSnakeHeadPosition() {
        return this.#snake.getHeadPosition();
    }

    getSnakeTailPosition() {
        return this.#snake.getTailPosition();
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