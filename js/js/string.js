let doubleQuoteStr = "String with double quotation";
let singleQuoteStr = 'String with single quotation';
let backTickStr = `String with backtick marks or template string ${5 + 2}`;

console.log(doubleQuoteStr);
console.log(singleQuoteStr);
console.log(backTickStr);

let str = "Test";
console.log(str[0]);    // T
console.log(str[1]);    // e
console.log(str[2]);    // s
console.log(str[3]);    // t
str[3] = "T";           // Nope
console.log(str);       // str still has "Test"

let msg = "Leave me alone";
console.log(msg.toUpperCase());  // Prints the message in all uppercase
let strWithSpaces = "    Trim Me!    ";
console.log(strWithSpaces.trim());  // Spaces before and after the string are trimmed.