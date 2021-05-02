'use strict';

/**
 * Represents the Number Input, which is the number that player guessed
 */
class NumberInput {
    /**
     * Default Constructor
     * @param {HTMLInputElement} element the input element
     */
    constructor(element) {
        this.element = element;
    }

    /**
     * Return the input element's value.
     * @returns {number} return the value of the input element as number
     */
    getValue() {
        return Number(this.element.value);
    }

    /**
     * Clear the input field.
     */
    clearValue() {
        this.element.value = null;
    }
}

/**
 *  Represents the target number the player must guess
 */
class TargetNumber {
    /**
     * Constructor
     * @param {HTMLDivElement} element the HTML element that displays the target number
     */
    constructor(element) {
        // The value of the target number is private
        let num = 0;
        this.element = element;

        /**
         * Generate a random number between 1 and limit (inclusive).
         * @param {number} limit
         */
        this.generateRandomNumber = function(limit) {
            num = Math.floor(Math.random() * limit) + 1;
        };

        /**
         * Display the target number
         */
        this.showNumber = function() {
            this.element.textContent = num;
        }

        /**
         * Compares the target number and the input number
         * @param {number} guessNumber the input guess
         * @returns {number} 0 if they are equal,
         *  positive number if the target number is larger,
         *  negative number if the target number is lower
         */
        this.compareTo = guessNumber => num - guessNumber;
    }

    /**
     * Hide the target number with a question mark.
     */
    hideNumber() {
        this.element.textContent = "?";
    }
}

/**
 *  Represents the message HTML element
 */
class MessageBox {
    /**
     * Constructor
     * @param {HTMLParagraphElement} element the message element
     */
    constructor(element) {
        this.element = element;
    }

    /**
     *  Set the message
     *  @param {string} message
     */
    setMessage(message) {
        this.element.textContent = message;
    }
}

/**
 *  Represents the score keeper. It keeps track of both the current score and the highest score
 *  and displays them.
 */
class ScoreKeeper {
    /**
     * Constructor
     * @param {HTMLSpanElement} scoreElement
     * @param {HTMLSpanElement} highestScoreElement
     */
    constructor(scoreElement, highestScoreElement) {
        this.scoreElement = scoreElement;
        this.highestScoreElement = highestScoreElement;
        this.highestScore = Number(this.highestScoreElement.textContent);
    }

    /**
     *  Set the score.
     *  @param {number} score
     */
    setScore(score) {
        this.scoreElement.textContent = String(score);
    }

    /**
     * Get the score.
     * @returns {number}
     */
    getScore() {
        return Number(this.scoreElement.textContent);
    }

    /**
     *  Update the highest score. If the current score is higher than the
     *  current highest score, then the current score will be assigned.
     */
    updateHighestScore() {
        if(this.getScore() > this.highestScore) {
            this.highestScoreElement.textContent = String(this.getScore());
            this.highestScore = this.getScore();
        }
    }
}

/**
 *  Represents the game
 */
class Game {
    /**
     * Constructor
     * @param {TargetNumber} targetNumber
     * @param {NumberInput} numberInput
     * @param {ScoreKeeper} scoreKeeper
     * @param {MessageBox} messageBox
     */
    constructor(targetNumber, numberInput, scoreKeeper, messageBox) {
        this.gameWon = false;
        this.limit = 20;
        this.defaultMessage = "Start guessing...";
        this.lowMessage = "Too low!";
        this.highMessage = "Too high!";
        this.correctMessage = "Correct number!";
        this.noNumberMessage = String.fromCodePoint(0x26d4) + " No number!";
        this.targetNumber = targetNumber;
        this.numberInput = numberInput;
        this.scoreKeeper = scoreKeeper;
        this.messageBox = messageBox;
    }

    /**
     * Initialize the game by setting default values for the elements and
     * generate a new random target number.
     */
    init() {
        this.scoreKeeper.setScore(this.limit);
        this.targetNumber.hideNumber();
        this.targetNumber.generateRandomNumber(this.limit);
        this.numberInput.clearValue();
        this.messageBox.setMessage(this.defaultMessage);
        this.gameWon = false;
        document.querySelector("body").style.backgroundColor = "#222";
    }

    /**
     * Allow user to take a guess
     */
    guess() {
        // Game is won, so there is nothing to do. User must call init()
        if(this.gameWon) return;

        // If the input number is null, undefined, or zero, print a message
        if(!this.numberInput.getValue()) {
            this.messageBox.setMessage(this.noNumberMessage);
            return;
        }

        // The guess number is equal to the input - Game Won
        if(this.targetNumber.compareTo(this.numberInput.getValue()) === 0) {
            this.gameWon = true;
            this.messageBox.setMessage(this.correctMessage);
            this.targetNumber.showNumber();
            this.scoreKeeper.updateHighestScore();
            document.querySelector("body").style.backgroundColor = "#60b347";
        } else {
            // Decrement the score since the guess is incorrect.
            this.scoreKeeper.setScore(this.scoreKeeper.getScore() - 1);

            // The guess number is lower than input
            if(this.targetNumber.compareTo(this.numberInput.getValue()) < 0)
                this.messageBox.setMessage(this.highMessage);

            // The guess number is higher than input
            if(this.targetNumber.compareTo(this.numberInput.getValue()) > 0)
                this.messageBox.setMessage(this.lowMessage);
        }
    }
}

// Select the HTML elements
let targetNumber = new TargetNumber(document.querySelector(".number"));
let numberInput = new NumberInput(document.querySelector(".guess"));
let scoreKeeper = new ScoreKeeper(
    document.querySelector(".score"),
    document.querySelector(".highscore")
);
let messageBox = new MessageBox(document.querySelector(".message"));
let game = new Game(
    targetNumber,
    numberInput,
    scoreKeeper,
    messageBox
);

// Initialize the game
game.init();

// Clicks the Again button
document.querySelector(".again").addEventListener("click", function() {
    game.init();
});

// Clicks the Check button
document.querySelector('.check').addEventListener("click", function() {
    game.guess();
});