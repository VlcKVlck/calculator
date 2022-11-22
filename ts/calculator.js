//Input handeling (parsing, clearing, displaying) and simple arithmetics
/**-----------------------------------------------------------------------------**/
var scientific;
var numInStr = ''; //holds the string value of the input until converts to num
var res = ''; //The output string displayed to user
var historyRes = ''; //Displays history
var prevNum = null;
var curNum = null;
var curOperator = null;
var prevOperator = null;
var total = 0;
var eqPressed = false;
var isValidNumber = function (num) { return /^(\d*)(\.\d*)?$/g.test(num); };
function isOperator(o) {
    if (o == '/' || o == '*' || o == '-' || o == '+') {
        return true;
    }
}
function checkStatus(c) {
    console.log(scientific, c);
    if (scientific == true) {
        sciCalc(c);
    }
    else {
        arithmeticCalc(c);
    }
}
// sciCalc function receives user input and manipulates it in non scientific mode
function sciCalc(c) {
    var temp = numInStr + c;
    if (isValidNumber(temp)) { //use regex to check if adding the digit will provide a valid number
        if (eqPressed) {
            console.log("yo");
            clearCalc();
            eqPressed = false;
        }
        res += c;
        numInStr += c;
        document.getElementById("result").innerHTML = res;
        if (!(prevNum && curNum)) {
            return;
        }
    }
    if ((prevOperator == "-" || prevOperator == "+") && (curOperator == '*' || curOperator == "/") && prevNum && curNum && numInStr) {
        console.log("i got here");
        var temp_1 = String(curNum) + curOperator + numInStr;
        curNum = eval(temp_1);
        numInStr = '';
        console.log("vicky", curNum);
        res = prevNum + prevOperator + curNum;
        document.getElementById("result").innerHTML = res;
    }
    if (isOperator(c)) {
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
            document.getElementById("result").innerHTML = res;
            return;
        }
        else {
            if (prevNum && prevOperator && !curNum) { //check if you need to reassign opeartor
                prevOperator = c;
                res = res.slice(0, -1);
                res += c;
                document.getElementById("result").innerHTML = res;
            }
            else { //or assign the next operator
                curOperator = c;
                res += c;
                document.getElementById("result").innerHTML = res;
            }
        }
        if ((prevOperator == '+' || prevOperator == '-') && !curOperator && prevNum && curNum) {
            console.log("vicky", "test");
            if (c == '*' || c == '/') {
                curOperator = c;
                return;
            }
        }
        if ((prevOperator == "-" || prevOperator == "+") && (curOperator == '*' || curOperator == "/") && prevNum && curNum && !numInStr) {
            console.log("i got in the return func");
            return;
        }
        //once we have 2 numbers and operator - run calculation
        if (prevNum && curNum && curOperator) {
            calcValues();
            res += curOperator;
            numInStr = '';
            prevOperator = curOperator;
            curOperator = null;
        }
    }
}
// arithmeticCalc function receives user input and manipulates it in non scientific mode
function arithmeticCalc(c) {
    console.log("numinstr:", numInStr, "prevnum:", prevNum, "curNum", curNum, "preopearto", prevOperator, "curoperator", curOperator);
    var temp = numInStr + c;
    if (isValidNumber(temp)) { //use regex to check if adding the digit will provide a valid number
        if (eqPressed) {
            clearCalc();
            eqPressed = false;
        }
        res += c;
        numInStr += c;
        document.getElementById("result").innerHTML = res;
        return;
    }
    if (isOperator(c)) {
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
            document.getElementById("result").innerHTML = res;
            return;
        }
        else {
            if (prevNum && prevOperator && !curNum) { //check if you need to reassign opeartor
                prevOperator = c;
                res = res.slice(0, -1);
                res += c;
                document.getElementById("result").innerHTML = res;
            }
            else { //or assign the next operator
                curOperator = c;
            }
        }
        //once we have 2 numbers and operator - run calculation
        if (prevNum && curNum && curOperator) {
            calcValues();
            res += curOperator;
            numInStr = '';
            prevOperator = curOperator;
            curOperator = null;
        }
    }
    console.log("numinstr:", numInStr, "prevnum:", prevNum, "curNum", curNum, "preopearto", prevOperator, "curoperator", curOperator);
}
//CalcValues performs the basic arithmetic calculations
function calcValues() {
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
    if ((numInStr && !prevNum) || (prevNum && !curNum)) { //handles multiple presses on "="
        total = prevNum;
    }
    historyRes = historyRes + res + "<br>";
    document.getElementById("historybody").innerHTML = historyRes;
    res = String(total);
    historyRes = historyRes + "=" + "<br>" + res + "<br>";
    prevNum = total;
    curNum = null;
    document.getElementById("result").innerHTML = res;
    document.getElementById("historybody").innerHTML = historyRes;
}
//Eq is triggered upon hitting the "=" sign.
function eq() {
    eqPressed = true;
    calcValues();
    clearCalc();
}
//clears the screen and all calculation data
function clearRes() {
    res = '';
    document.getElementById("result").innerHTML = res;
    prevNum = null;
    historyRes = '';
    document.getElementById("historybody").innerHTML = historyRes;
    clearCalc();
}
//Clears saved data after a calcualtion is complete
function clearCalc() {
    numInStr = '';
    curNum = null;
    total = 0;
    curOperator = null;
    prevOperator = null;
    console.clear();
}
//delete last deletes the last input and allows to continue calculting from that point (you
//can add an operator or another digit.
function deleteLast() {
    if (numInStr) {
        numInStr = numInStr.slice(0, -1);
        res = res.slice(0, -1);
        console.log(res);
        document.getElementById("result").innerHTML = res;
    }
    else if (prevOperator) {
        prevOperator = null;
        res = res.slice(0, -1);
        document.getElementById("result").innerHTML = res;
    }
}
var numBtns = document.querySelectorAll('.numbutton');
numBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { return checkStatus(btn.getAttribute('id')); });
});
var opsBtns = document.querySelectorAll('.calcbutton');
opsBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { return checkStatus(btn.getAttribute('value')); });
});
document.getElementById('equal').addEventListener('click', eq);
document.addEventListener('DOMContentLoaded', loadCalc);
function loadCalc() {
    scientific = false;
}
/**------------------------------------------------------------------------------------**/
function plusMinus() {
    if (numInStr) {
        if (numInStr[0] == "-") {
            numInStr = numInStr.slice(1);
        }
        else {
            numInStr = "-" + numInStr;
        }
    }
}
document.getElementById('square').addEventListener('click', squareRoot);
