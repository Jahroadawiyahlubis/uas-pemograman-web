let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll(".button");

let string = "";
let arr = Array.from(buttons);

arr.forEach((button) => {
    button.addEventListener("click", (e) => {
        let buttonValue = e.target.innerHTML;

        if (buttonValue == "=") {
            try {
                let result = safeEval(string);
                string = result.toString();
                input.value = formatNumber(result);
            } catch {
                input.value = "Error";
                string = "";
            }
        } else if (buttonValue == "AC") {
            string = "";
            input.value = string;
        } else if (buttonValue == "DEL") {
            string = string.slice(0, -1);
            input.value = string;
        } else if (buttonValue == "÷") {
            string += "/";
            input.value = string;
        } else if (buttonValue == "x") {
            string += "*";
            input.value = string;
        } else if (buttonValue == "%") {
            string = convertPercent(string);
            input.value = string;
        } else if (buttonValue == "√") {
            string = Math.sqrt(safeEval(string)).toString();
            input.value = formatNumber(string);
        } else {
            string += buttonValue;
            input.value = string;
        }
    });
});

// Mengubah angka terakhir menjadi persen
function convertPercent(exp) {
    return exp.replace(/(\d+)(?!.*\d)/, (match) => match / 100);
}

// Format angka dengan titik pemisah
function formatNumber(num) {
    if (!isNaN(num)) {
        return Number(num).toLocaleString("id-ID");
    } else {
        return num;
    }
}

// Fungsi aman untuk evaluasi ekspresi
function safeEval(expression) {
    if (/^[0-9+\-*/.%() ]+$/.test(expression)) {
        return Function(`return ${expression}`)();
    } else {
        throw new Error("Invalid Input");
    }
}
