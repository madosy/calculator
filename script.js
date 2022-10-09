//basic math operators
const add = function(a,b) {return parseFloat(a) + parseFloat(b)}
const subtract = function(a,b) {return parseFloat(a) - parseFloat(b)}
const multiply = function(a,b) {return parseFloat(a) * parseFloat(b)}
const divide = function(a,b) {return parseFloat(a) / parseFloat(b)}

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

//grab all num buttons
var numButtons = document.querySelectorAll('div.num.button')
numButtons.forEach((button) => {
    //if there is an operator, and there is no first value, store the value
    button.addEventListener('click', () => {
        if (operator != '' && valArr.length < 1) storeValue(getInput())
    })
    //clear display if operator was pressed
    button.addEventListener('click', ()=> {
        if (operatorPressed) {
            updateDisplay('')
            operatorPressed = false;
        }
    })
    button.addEventListener('click', ()=>appendInput(button.textContent))
})

var opButtons = document.querySelectorAll('div.op > div.button')
let operator = ''
let operatorPressed = false;
for (let index = 0; index < (opButtons.length -1); index++) {
    opButtons[index].addEventListener('click', () => {
        // if (equalityPressed == false) storeValue(getInput())
        // if (valArr.length > 1) {
        //     result = operate(operator)
        //     savePop(result)
        //     updateDisplay(result)
        // }
        //if there is a first and 2nd value, operate then update the display
        // if (valArr.length > 1) {
        //     result = operate(operator)
        //     updateDisplay(result)
        //     valArr.pop();
        // }

        // if there is a first value and an operator, store the value
        if (valArr.length == 1 && operator != '') {
            storeValue(getInput())
        }
    // opButtons[index].addEventListener('click', ()=> {
    //     //if there is a first value and an operator, store the value
    //     if (valArr.length == 1 && operator != '') {
    //         storeValue(getInput())
    //     }
    // })

        operator = opButtons[index].textContent
        operatorPressed = true;
    })
}

function operate(operator){
    a = valArr[0]
    b = valArr[1]
    let result = 0

    if (operator == '+') result = add(a,b)
    else if (operator == '−') result = subtract(a,b)
    else if (operator == '×') result = multiply(a,b)
    else if (operator == '÷') result = divide(a,b)

    return result;
}

let valArr = [];
function storeValue(a) {
    if (valArr.length < 1) valArr[0]= a
    else valArr[1] = a
}


// clearDisplay = false



// equalityPressed = false;
// opButtons[4].addEventListener('click', () => {
//     equalityPressed = true;
//     storeValue(getInput())
//     if (valArr.length > 1) {
//         result = operate(operator)
//         updateDisplay(result)
//     }
//     // valArr=[]
// })

// function savePop(result) {
//     valArr[0] = result;
//     valArr.pop();
// }


/* if I click an operator and I don't have a stored value, store to 1st spot.*/
/* if I click an operator and I have a first value, but not a 2nd value, store to 2nd spot*/
/* if I click an operator and I have a first and a 2nd value, run the operation based on operator then store the new operator*/
    /*if the operator clicked was '=', don't do anything to the stored array*/
    /*if the operator clicked was other operators, store the result to first value, and pop off the 2nd value*/