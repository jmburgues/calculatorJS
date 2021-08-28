class Calculator {
    constructor() {
        this.value = 0;
        this.operation = null;
        this.isInit = false;
    }

    clear() {
        this.value = 0;
        this.operation = null;
        this.isInit = false;
    }

    selectOperation(operator) {
        var num1, num2;
        switch (operator) {
            case "+":
                this.operation = function (num1, num2) {
                    this.value = num1 + num2;
                };
                break;
            case "-":
                this.operation = function (num1, num2) {
                    this.value = num1 - num2;
                };
                break;
            case "*":
                this.operation = function (num1, num2) {
                    this.value = num1 * num2;
                };
                break;
            case "/":
                this.operation = function (num1, num2) {
                    this.value = num1 / num2;
                };
                break;
        }
    }

    operationLoaded() {
        return (this.operation == null) ? false : true;
    }

    process(value1, value2) {
        this.operation(value1, value2);
        return this.value;
    }
}

var buttons = Array.from(document.getElementsByTagName("button"));
var display = document.getElementById("result");
var calculator = new Calculator();

//detecting keystrokes
document.addEventListener("keypress", function(event) {
    switch(true){
        case (event.keyCode == 13):
            buttonMainFunc(document.getElementById("equals"));
            break;
        case (event.keyCode == 42):
            buttonMainFunc(document.getElementById("*"))
            break;
        case (event.keyCode == 43):
            buttonMainFunc(document.getElementById("+"))
            break;
        case (event.keyCode == 45):
            buttonMainFunc(document.getElementById("-"))
            break;
        case (event.keyCode == 47):
            buttonMainFunc(document.getElementById("/"))
            break;
        case (event.keyCode > 47 && event.keyCode < 58):
            buttonMainFunc(document.getElementById(event.keyCode - 48))
            break;
        case (event.keyCode > 93 && event.keyCode < 105):
            buttonMainFunc(document.getElementById(event.keyCode - 97))
            break;
    }
    
    /*
    if((event.keyCode > 47 && event.keyCode < 58)){
        var elementId = event.keyCode - 48;
        buttonMainFunc(document.getElementById(elementId))
    }
    if((event.keyCode > 95 && event.keyCode < 105)){
        var elementId = event.keyCode -97;
    }
    if(event.keyCode == 13){
        buttonMainFunc(document.getElementById("equals"))
    }
    if(event.keyCode == 43){
        buttonMainFunc(document.getElementById("+"))
    }
    if(event.keyCode == 45){
        buttonMainFunc(document.getElementById("-"))
    }
    if(event.keyCode == 47){
        buttonMainFunc(document.getElementById("/"))
    }
    if(event.keyCode == 42){
        buttonMainFunc(document.getElementById("*"))
    }*/
});

//onClick function for html buttons
buttons.forEach(element => {
    element.setAttribute("onclick", "buttonMainFunc(this)");
});

function buttonMainFunc(element) {
    switch (element.name) {
        case "num" || ".":
            if (calculator.isInit) {
                if(Number.isNaN(parseInt(display.innerHTML)))
                    display.innerHTML = element.id;
                else
                    display.innerHTML += element.id;
            }
            else {
                display.innerHTML = element.id;
            }
            display.isNumber = true;
            calculator.isInit = true;
            break;

        case "operator":
            if (display.isNumber) {
                calculator.value = parseFloat(display.innerHTML);
            }
            display.innerHTML = element.id;
            calculator.selectOperation(element.id);
            display.isNumber = false;
            break;

        case "C":
            calculator.clear()
            display.innerHTML = calculator.value;
            display.isNumber = true;
            break;

        case "=":
            if (display.isNumber && calculator.operationLoaded()) {
                display.innerHTML = calculator.process(calculator.value, parseFloat(display.innerHTML));
            }
            break;
    }
}
