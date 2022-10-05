//basic math operators
const add = function(a,b) {
    return parseFloat(a) + parseFloat(b)
}

const subtract = function(a,b) {
    return parseFloat(a) - parseFloat(b)
}

const multiply = function(a,b) {
    return parseFloat(a) * parseFloat(b)
}

const divide = function(a,b) {
    return parseFloat(a) / parseFloat(b)
}

var inputElement = document.querySelector('.input-container');

//grab input text
function getInput() {
    var inputNum = parseFloat(inputElement.textContent)
    return inputNum
}

function appendInput(a) {
    inputElement.textContent += a
}
