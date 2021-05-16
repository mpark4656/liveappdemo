console.log("We've seen this before!");

document.querySelector("#alert-button").addEventListener("click", event => {
    alert("Button Clicked!");
});

document.getElementById("prompt-button").addEventListener("click", function() {
   alert(`Your name is ${prompt("What is your name?")}.`);
});