class Calculator {
    constructor() {
        this.value = null;
        this.operation = null;
        this.isInit = false;
    }

    clear() {
        this.value = null;
        this.operation = null;
        this.isInit = false;
    }

    hasValue() {
        return (this.value != null) ? true : false;
    }

    setValue(value) {
        this.value = value;
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

    process(value2) {
        this.operation(this.value, value2);
        return this.value;
    }
}

class Display{
    constructor(display) {
        this.displayHandler = display;
        this.showable = display.innerHTML;
        this.NumberValue = 0;
        this.calculateNumberValue(this.showable);
    }

    add(element) {
        this.showable += this.showable + element;
        this.calculateNumberValue(this.display);
    }

    set(element) {
        this.showable = element;
        this.calculateNumberValue(this.display);
    }

    getNumberValue() {
        return this.NumberValue;
    }

    NumberValue(element) {
        this.calculateNumberValue(element);
    }

    clearDisplay() {
        this.showable = 0;
        this.NumberValue = 0;
    }

    isNumber() {
        return (this.NumberValue != NaN) ? true : false;
    }

    calculateNumberValue(element) {
        if(!Number.isNaN(parseInt(element))) {
            this.NumberValue = parseInt(element);
        } else if(!Number.isNaN(parseFloat(element))) {
            this.NumberValue = parseFloat(element)
        } else {
            this.NumberValue = NaN;
        }
    }
}

/*
document.addEventListener("keyup", function(event) {
    if(event.keyCode > 47 && event.keyCode < 58){
        var elementId = event.keyCode - 47;
        buttonMainFunc(Document.getElementById(elementId))
    }
});
*/

var calculator = new Calculator();
var display = new Display(document.getElementById("result"));

var buttons = Array.from(document.getElementsByTagName("button"));
buttons.forEach(element => {
    element.setAttribute("onclick", "buttonMainFunc(this)");
});

function buttonMainFunc(element) {
    switch (element.name) {
        case "num" || ".":
            display.add(element.id);
            break;

        case "operator":
            if (display.isNumber()) {
                calculator.setValue(display.NumberValue());
            }
            display.set(element.id)
            calculator.selectOperation(element.id);
            break;

        case "C":
            calculator.clear()
            display.clear()
            break;

        case "=":
            if (display.isNumber() && calculator.operationLoaded() && calculator.hasValue()) {
                display.set(calculator.process(display.NumberValue()));
            }
            break;
    }
}
