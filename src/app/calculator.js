var scientific = false;
var remote = false;
var numInStr = ''; //holds the string value of the input until converts to num
var res = ''; //The output string displayed to user
var historyRes = ''; //Displays history
var prevNum = null;
var curNum = null;
var curOperator = null;
var prevOperator = null;
var total = 0;
var eqPressed = false;
var mathJsURL = "http://api.mathjs.org/v4/?expr=";
var isValidNumber = function (num) { return /^(\d*)(\.\d*)?$/g.test(num); };
var setRes = document.getElementById("result");
//CheckStatus redirects incoming key presses based on status: scientific/arithmetics. Remote mode uses
//the logic of the scientific eval function
function checkStatus(c) {
    console.log(scientific, c);
    if (scientific == true) {
        sciCalc(c);
    }
    else {
        arithmeticCalc(c);
    }
}
//Helper for the calculations functions. Checks if an operator is passed.
function isOperator(o) {
    if (o == '/' || o == '*' || o == '-' || o == '+' || o == '%' || o == '^' || o == '√') {
        return true;
    }
}
////Helper for the calculations functions. Handles key presses => operators and operands
function inputIntoEquation(c) {
    var temp = numInStr + c;
    console.log("yo");
    if (isValidNumber(temp)) {
        if (eqPressed) {
            clearCalc();
            res = '';
            eqPressed = false;
            prevNum = null;
            setRes.innerHTML = res;
        }
        res += c;
        numInStr += c;
        setRes.innerHTML = res;
        if (!(prevNum && curNum)) {
            return;
        }
    }
}
//Helper for the calculations functions. Calls for a calculation once there are two operands and an operator
function getCalcOnOperator() {
    if (prevNum && curNum && curOperator) {
        calcValuesArithmetic();
        res += curOperator;
        numInStr = '';
        prevOperator = curOperator;
        curOperator = null;
    }
}
//Helper for the calculations functions. Handles status upon passing an operator.
function onOperator(c) {
    if (!res) {
        return;
    }
    if (eqPressed) {
        eqPressed = false;
    }
    //assign the first number
    if (!prevNum) {
        prevNum = Number(numInStr);
        numInStr = '';
        total = prevNum;
    }
    //assign the second number if we have the first number
    else if (!curNum) {
        curNum = Number(numInStr);
        numInStr = '';
    }
    //assign operators
    if (!prevOperator) {
        prevOperator = c;
        res += c;
        setRes.innerHTML = res;
        return;
    }
    else {
        if (prevNum && prevOperator && !curNum) { //check if you need to reassign opeartor
            prevOperator = c;
            res = res.slice(0, -1);
            res += c;
            setRes.innerHTML = res;
        }
        else { //or assign the next operator
            curOperator = c;
        }
    }
}
//Runs the calculation for Sci modes, taking into account order of operations
function sciCalcEval() {
    console.log("i got here");
    var inputStr = res;
    if (curOperator == '^' || prevOperator == '^') {
        inputStr = inputStr.replace('^', '**');
    }
    if (remote == true) {
        remoteMode(inputStr);
        return;
    }
    if (curOperator == '√') {
        var temp = curNum;
        curNum = Math.pow(curNum, (1 / Number(numInStr)));
        prevNum = eval(res.replace(String(temp) + "√" + numInStr, String(curNum)));
    }
    else if (prevOperator == '√') {
        prevNum = Math.pow(prevNum, (1 / Number(numInStr)));
        // inputStr = String(prevNum);
    }
    else {
        prevNum = eval(inputStr);
    }
    numInStr = '';
    console.log("vicky", curNum);
    curNum = null;
    total = prevNum;
    displayCalc();
}
// sciCalc function receives user input and manipulates it in a scientific mode. Adheres to
//order of operations.
function sciCalc(c) {
    inputIntoEquation(c);
    if (prevOperator && curOperator && prevNum && curNum && numInStr && isOperator(c)) {
        sciCalcEval();
    }
    if (isOperator(c)) {
        onOperator(c);
        if (!curOperator && prevNum && curNum) {
            return;
        }
        if (((prevOperator != "%" && prevOperator != '^' && prevOperator != '√') && curOperator && prevNum && curNum && !numInStr)) {
            console.log("i got in the return func");
            res += c;
            setRes.innerHTML = res;
            return;
        }
        getCalcOnOperator();
    }
}
// arithmeticCalc function receives user input and manipulates it in non scientific mode
//runs calculations once we have two operands. No operations order followed.
function arithmeticCalc(c) {
    inputIntoEquation(c);
    if (isOperator(c)) {
        onOperator(c);
        getCalcOnOperator();
    }
}
//CalcValues performs the basic arithmetic calculations
function calcValuesArithmetic() {
    if (numInStr && prevNum && !curNum) { //handles the final number conversion from str to num
        curNum = Number(numInStr);
        numInStr = '';
    }
    if (prevOperator == '*') {
        total = prevNum * curNum;
    }
    if (prevOperator == '/') {
        if (curNum == 0) {
            alert("can't divide by zero");
            return;
        }
        total = prevNum / curNum;
    }
    if (prevOperator == '+') {
        total = prevNum + curNum;
    }
    if (prevOperator == '-') {
        total = prevNum - curNum;
    }
    if (prevOperator == '%') {
        total = prevNum % curNum;
    }
    if (prevOperator == '^') {
        total = Math.pow(prevNum, curNum);
    }
    if (prevOperator == '√') {
        total = Math.pow(curNum, (1 / prevNum));
    }
    if (prevNum && !curNum) { //handles multiple presses on "="
        total = prevNum;
    }
    if (numInStr && !prevNum) { //handles pressing = after just inputting a number
        total = Number(numInStr);
    }
    prevNum = total;
    curNum = null;
    displayCalc();
}
//Handles the display in the history panel.
function displayCalc() {
    historyRes = historyRes + res + "<br>";
    document.getElementById("historybody").innerHTML = historyRes;
    res = String(total);
    historyRes = historyRes + "=" + "<br>" + res + "<br>";
    setRes.innerHTML = res;
    document.getElementById("historybody").innerHTML = historyRes;
}
//Eq is triggered upon hitting the "=" sign.
function eq() {
    eqPressed = true;
    if (scientific == true) {
        sciCalcEval();
    }
    else {
        calcValuesArithmetic();
    }
    clearCalc();
}
//clears the screen and all calculation data
function clearRes() {
    res = '';
    setRes.innerHTML = res;
    prevNum = null;
    historyRes = '';
    document.getElementById("historybody").innerHTML = historyRes;
    clearCalc();
}
//Clears saved data after a calculation is complete
function clearCalc() {
    numInStr = '';
    curNum = null;
    total = 0;
    curOperator = null;
    prevOperator = null;
    console.clear();
}
//deleteLast deletes the last input and allows to continue calculating from that point (you
//can add an operator or another digit.
function deleteLast() {
    if (numInStr) {
        numInStr = numInStr.slice(0, -1);
        res = res.slice(0, -1);
        console.log(res);
        setRes.innerHTML = res;
    }
    else if (prevOperator) {
        prevOperator = null;
        res = res.slice(0, -1);
        setRes.innerHTML = res;
    }
    else if (prevNum) {
        prevNum = parseInt(String(prevNum / 10));
        res = String(prevNum);
        numInStr = String(prevNum);
        setRes.innerHTML = res;
    }
}
//Handles the +/- sign.
function plusMinusFunc() {
    if (numInStr) {
        console.log("vicky");
        var newNumInStr = String(Number(numInStr) * (-1));
        res = res.replace(numInStr, newNumInStr);
        numInStr = newNumInStr;
        setRes.innerHTML = res;
    }
    else if (prevNum) {
        var newNum = String((prevNum) * (-1));
        res = res.replace(String(prevNum), newNum);
        prevNum = Number(newNum);
        setRes.innerHTML = res;
    }
}
//Will on press raise to the power of 2 the last operand entered
function timesSquare() {
    if (numInStr) {
        if (prevNum) {
            curNum = Number(numInStr) * Number(numInStr);
            res = res.replace(numInStr, String(curNum));
            numInStr = '';
            setRes.innerHTML = res;
        }
        else {
            prevNum = Number(numInStr) * Number(numInStr);
            res = numInStr + "^" + 2;
            numInStr = '';
            setRes.innerHTML = res;
            total = prevNum;
            displayCalc();
        }
    }
    else if (prevNum) {
        curNum = prevNum * prevNum;
        res = res.replace(String(prevNum), String(curNum));
        numInStr = '';
        setRes.innerHTML = res;
    }
}
//Will on press calc the square root of the last operand entered
function rootFunc() {
    if (numInStr) {
        if (prevNum) {
            if (prevNum < 0) {
                alert(Error);
            }
            curNum = Math.pow(prevNum, 1 / 2);
            res = res.replace(numInStr, String(curNum));
            numInStr = '';
            setRes.innerHTML = res;
        }
        else {
            if (Number(numInStr) < 0) {
                alert(Error);
            }
            prevNum = Math.pow(Number(numInStr), 1 / 2);
            res = "v" + numInStr;
            numInStr = '';
            setRes.innerHTML = res;
            total = prevNum;
            displayCalc();
        }
    }
    else if (prevNum) {
        if (prevNum < 0) {
            alert(Error);
        }
        curNum = Math.pow(prevNum, 1 / 2);
        numInStr = '';
        res = '√' + prevNum;
        total = curNum;
        displayCalc();
    }
}
//Adds pi
function setPie() {
    if (!numInStr) {
        numInStr = String(Math.PI);
        res += numInStr;
        setRes.innerHTML = res;
    }
}
//Helper  for factorialFunc
function calcFactorial(num) {
    var total = 1;
    for (var j = 1; j < (num + 1); j++) {
        total = total * j;
    }
    return total;
}
//Calculate factorial for the last operand entered
function factorialFunc() {
    if (numInStr) {
        if (prevNum) {
            curNum = calcFactorial(Number(numInStr));
            res = res.replace(numInStr, String(curNum));
            numInStr = '';
            setRes.innerHTML = res;
        }
        else {
            prevNum = calcFactorial(Number(numInStr));
            res = numInStr + "!";
            numInStr = '';
            setRes.innerHTML = res;
            total = prevNum;
            displayCalc();
        }
    }
    else if (prevNum) {
        curNum = calcFactorial(prevNum);
        res = res.replace(String(prevNum), String(curNum));
        numInStr = '';
        setRes.innerHTML = res;
    }
}
//Sends equation to math.js. Alerts user if no response within 2 secs. Return result of equation.
function remoteMode(x) {
    console.log("entered");
    if (x.includes('√')) {
        x = x.replace('√', '^(1/') + ')';
    }
    x = x.replace('**', '^');
    console.log(x);
    var URL = mathJsURL + encodeURIComponent(x);
    var controller = new AbortController();
    var timeoutId = setTimeout(function () { return controller.abort(); }, 2000);
    fetch(URL, { signal: controller.signal })
        .then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (data) {
        prevNum = total = data;
        document.getElementById('result').innerHTML = String(total);
        displayCalc();
    })["catch"](function () {
        alert("Error. Please try the local calculator");
    });
    clearTimeout(timeoutId);
}
//Sends base2 number to networkcalc. Alerts user if no response within 2 secs. Return base 10 number.
function base2Func() {
    fetch("https://networkcalc.com/api/binary/" + numInStr)
        .then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        prevNum = total = Number(data.converted);
        document.getElementById('result').innerHTML = String(total);
        displayCalc();
    })["catch"](function () {
        alert("Error. Please try the local calculator");
    });
}
var numBtns = document.querySelectorAll('.numbutton');
numBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { return checkStatus(btn.getAttribute('id')); });
});
var opsBtns = document.querySelectorAll('.calcbutton');
opsBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { return checkStatus(btn.getAttribute('value')); });
});
document.getElementById('plusminus').addEventListener('click', plusMinusFunc);
document.getElementById('equal').addEventListener('click', eq);
document.getElementById('square').addEventListener('click', timesSquare);
document.getElementById('root').addEventListener('click', rootFunc);
document.getElementById('pie').addEventListener('click', setPie);
document.getElementById('factorial').addEventListener('click', factorialFunc);
document.getElementById('base2').addEventListener('click', base2Func);
