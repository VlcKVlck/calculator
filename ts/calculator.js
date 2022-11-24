var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//Input handeling (parsing, clearing, displaying) and simple arithmetics
/**-----------------------------------------------------------------------------**/
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
function isOperator(o) {
    if (o == '/' || o == '*' || o == '-' || o == '+' || o == '%' || o == '^' || o == '√') {
        return true;
    }
}
//CheckStatus redirects incoming key presses based on status: scientific/arithmetics
function checkStatus(c) {
    console.log(scientific, c);
    if (scientific == true) {
        sciCalc(c);
    }
    else {
        arithmeticCalc(c);
    }
}
//Handles key presses => operators and operands
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
//calls for a calculation once there are two operands and an operator
function getCalcOnOperator() {
    if (prevNum && curNum && curOperator) {
        calcValuesArithmetic();
        res += curOperator;
        numInStr = '';
        prevOperator = curOperator;
        curOperator = null;
    }
}
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
    prevNum = eval(inputStr);
    if (curOperator == '√') {
        curNum = Math.pow(curNum, (1 / prevNum));
        // prevNum = eval (res.replace())
    }
    if (prevOperator == '√') {
        prevNum = Math.pow(prevNum, (1 / Number(numInStr)));
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
    if (prevOperator == 'v') {
        total = Math.pow(curNum, (1 / prevNum));
    }
    //
    if ((numInStr && !prevNum) || (prevNum && !curNum)) { //handles multiple presses on "="
        total = prevNum;
    }
    prevNum = total;
    curNum = null;
    displayCalc();
}
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
        setRes.innerHTML = res;
    }
    else if (prevOperator) {
        prevOperator = null;
        res = res.slice(0, -1);
        setRes.innerHTML = res;
    }
    else if (prevNum) {
        prevNum = parseInt(String(prevNum / 10));
        res = prevNum;
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
        prevNum = newNum;
        setRes.innerHTML = res;
    }
}
function timesSquare() {
    if (numInStr) {
        if (prevNum) {
            curNum = Number(numInStr) * Number(numInStr);
            res = res.replace(numInStr, curNum);
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
        res = res.replace(prevNum, curNum);
        numInStr = '';
        setRes.innerHTML = res;
    }
}
function rootFunc() {
    if (numInStr) {
        if (prevNum) {
            if (prevNum < 0) {
                alert(Error);
            }
            curNum = Math.pow(prevNum, 1 / 2);
            res = res.replace(numInStr, curNum);
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
function setPie() {
    if (!numInStr) {
        numInStr = String(Math.PI);
        res += numInStr;
        setRes.innerHTML = res;
    }
}
function calcFactorial(num) {
    var total = 1;
    for (var j = 1; j < (num + 1); j++) {
        total = total * j;
    }
    return total;
}
function factorialFunc() {
    if (numInStr) {
        if (prevNum) {
            curNum = calcFactorial(Number(numInStr));
            res = res.replace(numInStr, curNum);
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
        res = res.replace(prevNum, curNum);
        numInStr = '';
        setRes.innerHTML = res;
    }
}
function remoteMode(x) {
    console.log("entered");
    var URL = mathJsURL + encodeURIComponent(x);
    remoteCalc(URL);
}
function remoteCalc(URL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("URL:", URL);
                    return [4 /*yield*/, fetch(URL)];
                case 1:
                    response = _a.sent();
                    console.log("response:", response);
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log("data:", data);
                    // res=data;
                    total = data;
                    document.getElementById('result').innerHTML = res;
                    displayCalc();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('Error occurred', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
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
/**------------------------------------------------------------------------------------**/
