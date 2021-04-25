const SHOW_ICON_CLASS_NAME = "fa-eye";
const HIDE_ICON_CLASS_NAME = "fa-eye-slash";
const PASSWORD_INPUT_ID = "password-input";
const ICON_ID = "eye-icon"

document.getElementById(ICON_ID).addEventListener("click", function() {
    this.classList.forEach(function(item) {
        if(item === SHOW_ICON_CLASS_NAME)
            setPasswordInputState("hide");
        if(item === HIDE_ICON_CLASS_NAME)
            setPasswordInputState("show");
    })
});

function setPasswordInputState(state) {
    let inputElement = document.getElementById(PASSWORD_INPUT_ID);
    let iconElement = document.getElementById(ICON_ID);
    if(state === "show") {
        inputElement.attributes.getNamedItem("type").value = "text";
        iconElement.classList.remove(HIDE_ICON_CLASS_NAME);
        iconElement.classList.toggle(SHOW_ICON_CLASS_NAME, true);
    }
    if(state === "hide") {
        inputElement.attributes.getNamedItem("type").value = "password";
        iconElement.classList.remove(SHOW_ICON_CLASS_NAME);
        iconElement.classList.toggle(HIDE_ICON_CLASS_NAME, true);
    }
}