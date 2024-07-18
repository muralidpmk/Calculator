document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    let lastCalculated = false;
    const maxFontSize = 5;
    const minFontSize = 1;

    function appendToDisplay(input) {
        const currentValue = display.value;
        const lastChar = currentValue.slice(-1);

        if (isDigit(input)) {
            if (currentValue === "0" || currentValue === "Error") {
                display.value = input;
                lastCalculated = false;
            } else {
                display.value += input;
            }
        } else if (isOperator(input)) {
            if (isOperator(lastChar)) {
                display.value = currentValue.slice(0, -1) + input;
            } else if (lastCalculated) {
                display.value = display.value + input;
                lastCalculated = false;
            } else {
                display.value += input;
            }
        } else if (input === ".") {
            const lastNumber = currentValue.split(/[\+\-\*\/]/).pop();
            if (!lastNumber.includes(".")) {
                display.value += input;
            }
        }

        adjustFontSize();
    }

    function clearDisplay() {
        display.value = "0";
        lastCalculated = false;
        adjustFontSize();
    }

    function delOneValue() {
        if (display.value === "" || display.value.length === 1 || display.value === "Error") {
            clearDisplay();
        } else {
            display.value = display.value.slice(0, -1);
        }
        adjustFontSize();
    }

    function calculate() {
        try {
            const result = eval(display.value.replace(/X/g, '*'));
            display.value = parseFloat(result.toFixed(2)).toString();
        } catch (e) {
            display.value = "Error";
        }
        lastCalculated = true;
        adjustFontSize();
    }

    function isDigit(input) {
        return /^\d$/.test(input);
    }

    function isOperator(input) {
        return ["+", "-", "*", "/", "%"].includes(input);
    }

    function adjustFontSize() {
        const lenOfTheDisplay = display.value.length;
        let newFontSize = maxFontSize;
        if (lenOfTheDisplay > 6) {
            newFontSize -= (lenOfTheDisplay - 6) * 0.5;
        }
        newFontSize = Math.max(newFontSize, minFontSize);
        display.style.fontSize = newFontSize + "rem";
    }

    window.appendToDisplay = appendToDisplay;
    window.clearDisplay = clearDisplay;
    window.delOneValue = delOneValue;
    window.calculate = calculate;

    document.addEventListener("keydown", function (k) {
        const key = k.key;
        if (isDigit(key) || key === ".") {
            appendToDisplay(key);
        } else if (isOperator(key)) {
            appendToDisplay(key);
        } else if (key === "Enter" || key === "=") {
            k.preventDefault(); // Prevent form submission if inside a form
            calculate();
        } else if (key === "Backspace") {
            delOneValue();
        } else if (key === "Escape") {
            clearDisplay();
        }
    });

    adjustFontSize(); 
});
