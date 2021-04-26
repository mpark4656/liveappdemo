import {Game} from "./Game.js";
import {CellContent} from "./Cell.js";
import {SnakeDirection} from "./Snake.js";

let game;
let running;
resetGame();

function resetGame() {
    clearInterval(running);
    document.getElementById("game-over-message").style.display = "none";
    game = new Game();
    drawBoard(game.getBoard, game.getSnakeHeadPosition(), game.getSnakeTailPosition());
    running = setInterval(() => runGame(game),700);
}

function runGame(game) {
    if(!game.isGameOver()) {
        game.moveSnake();
        drawBoard(game.getBoard, game.getSnakeHeadPosition(), game.getSnakeTailPosition());
    } else {
        clearInterval();
        document.getElementById("game-over-message").style.display = "block";
    }
}

function drawBoard(board, headPosition, tailPosition) {
    let boardElement = document.getElementById("board-container");
    while(boardElement.hasChildNodes()) {
        boardElement.removeChild(boardElement.lastChild);
    }

    for(let i = 0; i < board.length; i++) {
        let row = board[i];
        let rowElement = document.createElement("div");
        rowElement.classList.add("board-row");

        for(let j = 0; j < row.length; j++) {
            let cellContent = board[i][j].getCellContent;
            let cellElement = document.createElement("div");

            cellElement.classList.add("board-cell");
            if(cellContent === CellContent.SNAKE) {
                cellElement.classList.add("snake");
                if(i === headPosition[0] && j === headPosition[1]) {
                    cellElement.classList.add("snake-head");
                }
                if(i === tailPosition[0] && j === tailPosition[1]) {
                    cellElement.classList.add("snake-tail");
                }
            } else if(cellContent === CellContent.FOOD) {
                cellElement.classList.add("food");
            } else {
                cellElement.classList.add("empty");
            }

            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}

document.getElementById("start-over-btn").addEventListener("click", function() {
    resetGame();
});

document.getElementById("toggle-btn").addEventListener("click", function() {
    if(running != null) {
        clearInterval(running);
        running = null;
    } else {
        running = setInterval(() => runGame(game),700);
    }
});

document.addEventListener("keydown", function(event) {
    switch (event.key) {
        case "ArrowLeft":
            game.setSnakeDirection = SnakeDirection.LEFT;
            break;
        case "ArrowRight":
            game.setSnakeDirection = SnakeDirection.RIGHT;
            break;
        case "ArrowUp":
            game.setSnakeDirection = SnakeDirection.UP;
            break;
        case "ArrowDown":
            game.setSnakeDirection = SnakeDirection.DOWN;
            break;
    }
});

