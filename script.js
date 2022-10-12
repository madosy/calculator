//basic math operators
const add = function(a,b) {return parseFloat(a) + parseFloat(b)}
const subtract = function(a,b) {return parseFloat(a) - parseFloat(b)}
const multiply = function(a,b) {return parseFloat(a) * parseFloat(b)}
const divide = function(a,b) {return parseFloat(a) / parseFloat(b)}


function operate(operator){
    a = first_val
    b = second_val
    let result = 0

    if (operator == '÷' && parseFloat(b) == 0){
        return "Can't Divide by 0"
    }

    if (operator == '+') result = add(a,b)
    else if (operator == '−') result = subtract(a,b)
    else if (operator == '×') result = multiply(a,b)
    else if (operator == '÷') result = divide(a,b)

    console.log(`${first_val} ${operator} ${second_val} = ${result}`)

    return result;
}

var inputElement = document.querySelector('.input-container');
var decimalPresent = false;

function numDigits(x) {
    x = Number(String(x).replace(/[^0-9]/g, ''));
    return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
  }

function updateDisplay(a) {
    if (typeof a == 'number' && numDigits(a) > 10) {
        inputElement.textContent = a.toPrecision(10)
        return
    }
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
    fv_bool = false;
    sv_bool = false;
    fo_bool = false;
    so_bool = false;
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
    button.addEventListener('click', () => numKeyLogic())


    //DONOTTOUCH
    button.addEventListener('click', ()=>appendInput(button.textContent))
})

var allButtons = document.querySelectorAll('div.button')
allButtons.forEach((button) => {
    button.addEventListener('transitionend', removeTransition)
})

function removeTransition(e) {
    this.classList.remove('pressed')
    
}

function numKeyLogic() {
    if (fv_bool && fo_bool && so_bool && sv_bool) { /*pressing num key after equals*/
            fv_bool = false;
            sv_bool = false;
            fo_bool = false;
            so_bool = false;
            updateDisplay('')
        } else if (fv_bool && fo_bool == false) { /*pressing num key after first operator*/
            // console.log(tempOperator)
            first_op = tempOperator;
            fo_bool = true;
            updateDisplay('')
        } 
        else if (so_bool) { /*pressing num key after non-equal second operator*/
            first_op = tempOperator;
            fo_bool = true;
            updateDisplay('')
            so_bool = false;
        }
}

let tempOperator = ''
var opButtons = document.querySelectorAll('div.op > div.button')
for (let index = 0; index < (opButtons.length -1); index++) {
    opButtons[index].addEventListener('click', () => {

        //operator functionality:
        opLogic()

    tempOperator = opButtons[index].textContent;

    })
}

function opLogic() {
    if (fv_bool && fo_bool && sv_bool && so_bool) { /*pressing operator after equal*/
        first_val = getInput();
        fo_bool = false;
        sv_bool = false;
        so_bool = false;
    } else if (fv_bool && fo_bool && so_bool == false) { /*pressing repeated operator key*/
        second_val = getInput();
        result = operate(first_op);
        updateDisplay(result);
        first_val = result;
        so_bool = true;
        second_op = tempOperator; //not really used but just for tracking
    } else if (fv_bool == false && so_bool == false) { /*pressing operator after first value*/
        first_val = getInput();
        fv_bool = true;
    } 
}

const equalButton = opButtons[4];
equalButton.addEventListener('click', ()=>{
    if (fv_bool && fo_bool && sv_bool == false) {
        second_op = '='
        second_val = getInput();
        result = operate(first_op);
        updateDisplay(result);
        fv_bool = true;
        fo_bool = true;
        sv_bool = true;
        so_bool = true;
    }

})


// document.addEventListener('keydown', (event) => {
//     var name = event.key;
//     var code = event.code;
//     // Alert the key name and key code on keydown
//     // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
//     if(!isNaN(name)) {
//         numKeyLogic()
//         appendInput(name)
//     }

//   }, false);

window.addEventListener('keydown', (press)=>{
    var keyName = press.key;
    if (keyName == 'Enter') keyName = '='
    keyPressed = document.querySelector(`div[data-key="${keyName}"]`)
    
    //highlight pressed key
    if (keyPressed != null) {
        keyPressed.classList.add("pressed")

        if (keyPressed.classList.contains("num")) {
            numKeyLogic()
            appendInput(keyName)
        }
    }
    // keyPressed.classList.add("pressed")

    if (keyName != '=' && keyPressed != null && keyPressed.classList.contains("op")) {
        opLogic()
        tempOperator = convertOpKey(keyName)
    }

    if (keyName == '='){
        if (fv_bool && fo_bool && sv_bool == false) {
            second_op = '='
            second_val = getInput();
            result = operate(first_op);
            updateDisplay(result);
            fv_bool = true;
            fo_bool = true;
            sv_bool = true;
            so_bool = true;
        }
    }
})

function convertOpKey(keyName) {
    if (keyName == '*') return '×'
    if (keyName == '/') return '÷'
    if (keyName == '-') return '−'
    if (keyName == '+') return '+'
} 

// numButtons.forEach((button) => {

//     //num functionality:
//     button.addEventListener('click', () => {
//         if (fv_bool && fo_bool && so_bool && sv_bool) { /*pressing num key after equals*/
//             fv_bool = false;
//             sv_bool = false;
//             fo_bool = false;
//             so_bool = false;
//             updateDisplay('')
//         } else if (fv_bool && fo_bool == false) { /*pressing num key after first operator*/
//             console.log(tempOperator)
//             first_op = tempOperator;
//             fo_bool = true;
//             updateDisplay('')
//         } 
//         else if (so_bool) { /*pressing num key after non-equal second operator*/
//             first_op = tempOperator;
//             fo_bool = true;
//             updateDisplay('')
//             so_bool = false;
//         }
//     })

//     //DONOTTOUCH
//     button.addEventListener('click', ()=>appendInput(button.textContent))
// })