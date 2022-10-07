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
    button.addEventListener('click', ()=>{
        if (condition) {
            updateDisplay(button.textContent)
            condition = false;
        }
    })
})

var modButtons = document.querySelectorAll('div.mod.button')
var modButton_clear = modButtons[0].addEventListener('click', ()=>{
    updateDisplay('0')
    valArr = [];
    operator = '';
})
var modButton_invert = modButtons[1].addEventListener('click', ()=>updateDisplay(getInput()*(-1)))
var modButton_percent = modButtons[2].addEventListener('click', ()=>updateDisplay(getInput()/100))

var opButtons = document.querySelectorAll('div.op > div.button')

let valArr = [];
function storeValue(a) {
    if (valArr.length < 1) valArr[0]= a
    else valArr[1] = a
}

let operator = ''
condition = false
opButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (valArr.length == 2) operate(operator)
        if (button.textContent != '=') operator = button.textContent
        console.log(operator)
        storeValue(getInput())
        condition = true
    })
})

opButtons[4].removeEventListener('click', () => {
    operator = button.textContent
    storeValue(getInput())
    condition = true
})

opButtons[4].addEventListener('click', () => {
    operate(operator)
    valArr=[]
})

function operate(operator){
    a = valArr[0]
    b = valArr[1]
    if (operator == '+'){
        var result = add(a,b)
    } else if (operator == '−') {
        var result = subtract(a,b)
    } else if (operator == '×') {
        var result = multiply(a,b)
    } else if (operator == '÷') {
        var result = divide(a,b)
    }
    if (operator != '='){
        savePop(result)
    }
    updateDisplay(result)
}

function savePop(result) {
    valArr[0] = result;
    valArr.pop();
}


/* if I click an operator and I don't have a stored value, store to 1st spot.*/
/* if I click an operator and I have a first value, but not a 2nd value, store to 2nd spot*/
/* if I click an operator and I have a first and a 2nd value, run the operation based on operator then store the new operator*/
    /*if the operator clicked was '=', don't do anything to the stored array*/
    /*if the operator clicked was other operators, store the result to first value, and pop off the 2nd value*/