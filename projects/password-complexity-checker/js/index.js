import PasswordChecker from "./PasswordChecker.js";

const SUBMIT_BUTTON_ID = "check-password-btn";
const RESET_BUTTON_ID = "reset-btn";
const PASSWORD_INPUT_ID = "password-input";
const MESSAGE_UL_ID = "message";

const HIDDEN_CLASS_NAME = "hidden";
const FAILED_CLASS_NAME = "failed";
const PASSED_CLASS_NAME = "passed";

let pwc = new PasswordChecker();
pwc
    .setMinimumLength(12)
    .setMaximumLength(20)
    .mustContainUpperCaseAlphabet(true).setMinimumUpperCaseAlphabetCount(4)
    .mustContainLowerCaseAlphabet(true).setMinimumLowerCaseAlphabetCount(4)
    .mustContainNumericValue(true).setMinimumNumericValueCount(4)
    .mustContainSpecialCharacter(true).setMinimumSpecialCharacterCount(4)
    .setProhibitedSpecialCharacters("+=-_?.>,<'\";:\\|`")
    .setMaximumSameCharacterRepeatLength(1);

document.getElementById(SUBMIT_BUTTON_ID).addEventListener("click", function(event) {
    let password = document.getElementById(PASSWORD_INPUT_ID).value;
    let messageList = document.getElementById(MESSAGE_UL_ID);
    let results = pwc.test(password);

    resetMessageList();

    for(let i = 0; i < results.length; i++) {
        let listItem = document.createElement("li");
        listItem.innerText = results[i][1];

        if(results[i][0] === "passed") listItem.classList.add(PASSED_CLASS_NAME);
        if(results[i][0] === "failed") listItem.classList.add(FAILED_CLASS_NAME);
        messageList.appendChild(listItem);
    }
    messageList.classList.remove(HIDDEN_CLASS_NAME);
});

document.getElementById(RESET_BUTTON_ID).addEventListener("click", function() {
    resetMessageList();
    document.getElementById(PASSWORD_INPUT_ID).value = "";
});

function resetMessageList() {
    let messageList = document.getElementById(MESSAGE_UL_ID);
    while(messageList.hasChildNodes()) {
        messageList.removeChild(messageList.lastChild);
    }
    messageList.classList.add(HIDDEN_CLASS_NAME);
}

