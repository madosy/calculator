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
var decimalPresent = false;

function updateDisplay(a) {
    inputElement.textContent = a
}

//grab input text
function getInput() {
    var inputNum = parseFloat(inputElement.textContent)
    return inputNum
}

function appendInput(a) {
    if (a=='.' && inputElement.textContent.indexOf('.') != -1){
        return
    } else if (a!="." && inputElement.textContent == '0'){
        updateDisplay(a)
        return
    }
    inputElement.textContent += a
}

//grab all num buttons
var numButtons = document.querySelectorAll('div.num.button')
numButtons.forEach((button) => {
    button.addEventListener('click', ()=>appendInput(button.textContent))
})