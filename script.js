//basic math operators
const add = function(a,b) {return parseFloat(a) + parseFloat(b)}
const subtract = function(a,b) {return parseFloat(a) - parseFloat(b)}
const multiply = function(a,b) {return parseFloat(a) * parseFloat(b)}
const divide = function(a,b) {return parseFloat(a) / parseFloat(b)}

function operate(operator){
    a = first_val
    b = second_val
    let result = 0

    if (operator == '+') result = add(a,b)
    else if (operator == '−') result = subtract(a,b)
    else if (operator == '×') result = multiply(a,b)
    else if (operator == '÷') result = divide(a,b)

    return result;
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

//mod buttons
var modButtons = document.querySelectorAll('div.mod.button')
var modButton_clear = modButtons[0].addEventListener('click', ()=>{
    updateDisplay('0')
    valArr = [];
    operator = '';
})
var modButton_invert = modButtons[1].addEventListener('click', ()=>updateDisplay(getInput()*(-1)))
var modButton_percent = modButtons[2].addEventListener('click', ()=>updateDisplay(getInput()/100))


let first_val = ''
let fv_bool = false;
let first_op = ''
let fo_bool = false;
let second_val = ''
let sv_bool = false;
let second_op = ''
let so_bool = false;

//grab all num buttons
var numButtons = document.querySelectorAll('div.num.button')
numButtons.forEach((button) => {

    //num functionality:
    button.addEventListener('click', () => {
        if (fv_bool && fo_bool == false) {
            console.log(tempOperator)
            first_op = tempOperator;
            fo_bool = true;
            updateDisplay('')
        } else if (so_bool) {
            first_op = tempOperator;
            fo_bool = true;
            updateDisplay('')
            so_bool = false;
        }
    })

    //DONOTTOUCH
    button.addEventListener('click', ()=>appendInput(button.textContent))
})

let tempOperator = ''
var opButtons = document.querySelectorAll('div.op > div.button')
for (let index = 0; index < (opButtons.length -1); index++) {
    opButtons[index].addEventListener('click', () => {

        //operator functionality:
        if (fv_bool && fo_bool && so_bool == false) {
            so_bool = true;
            second_op = tempOperator;
            second_val = getInput();
            result = operate(first_op);
            updateDisplay(result);
            first_val = result;
            fv_bool == true;
            fo_bool == false;
        } else if (fv_bool == false && so_bool == false) {
            first_val = getInput();
            fv_bool = true;
        }

    tempOperator = opButtons[index].textContent;

    })
}

const equalButton = opButtons[4];
equalButton.addEventListener('click', ()=>{
    if (fv_bool && fo_bool && sv_bool == false) {
        second_val = getInput();
        result = operate(first_op);
        updateDisplay(result);
        fv_bool = false;
        fo_bool = false;
    }

})