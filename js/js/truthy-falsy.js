document.querySelector("#prompt-button").addEventListener("click", event => {
    const input = prompt("Enter something");
    if(input.trim()) {
        alert(`You entered something: ${input.trim()}.`);
    } else {
        alert(`No characters in your input.`);
    }
})