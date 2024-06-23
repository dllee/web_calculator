let display = document.getElementById('display');
let currentOperator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        display.value = value;
        waitingForSecondOperand = false;
    } else {
        display.value = display.value === '0' ? value : display.value + value;
    }
}

function clearDisplay() {
    display.value = '0';
    currentOperator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
}

function toggleSign() {
    display.value = parseFloat(display.value) * -1;
}

function percentage() {
    display.value = parseFloat(display.value) / 100;
}

function operate(operator) {
    const inputValue = parseFloat(display.value);
    
    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (currentOperator) {
        const result = performCalculation();
        display.value = String(result);
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    currentOperator = operator;
}

function calculate() {
    if (currentOperator && !waitingForSecondOperand) {
        const result = performCalculation();
        display.value = String(result);
        firstOperand = result;
        currentOperator = null;
    }
}

function performCalculation() {
    const secondOperand = parseFloat(display.value);
    switch (currentOperator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operate(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
        if (display.value === '') display.value = '0';
    }
});

window.onload = function() {
    display.focus();
};