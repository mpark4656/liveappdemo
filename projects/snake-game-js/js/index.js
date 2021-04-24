import {Game} from "./Game.js";
import {CellContent} from "./Cell.js";
import {SnakeDirection} from "./Snake.js";

let game = new Game(10, [[4, 5], [4, 4], [4, 3], [4, 2], [4, 1]]);
resetBoard(game.getBoard);
setInterval(() => runGame(game),700)

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

function runGame(game) {
    if(!game.isGameOver()) {
        game.moveSnake();
        resetBoard(game.getBoard);
    } else {
        clearInterval();
        document.getElementById("game-over-message").style.display = "block";
    }
}

function resetBoard(board) {
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


