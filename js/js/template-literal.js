let product = "Artichoke";
let price = 3.99;
let qty = 5;

console.log(
    `You bought ${qty} of ${product} at $${price} each. The total price is ${(price * qty).toFixed(2)}.`
);