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

//grab input text
function getInput() {
    var inputNum = parseFloat(document.querySelector('.input-container').textContent)
    return inputNum
}
