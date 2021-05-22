const age = 90;
if(age < 5 || age >= 65) {
    console.log("FREE");
} else if(age > 5 && age < 10) {
    console.log("$10");
} else if(!(age >= 65)) {
    console.log("$20");
}