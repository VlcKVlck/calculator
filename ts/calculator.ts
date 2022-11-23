
//Input handeling (parsing, clearing, displaying) and simple arithmetics
/**-----------------------------------------------------------------------------**/
let scientific;
let numInStr = ''; //holds the string value of the input until converts to num
let res =''; //The output string displayed to user
let historyRes = ''; //Displays history
let prevNum = null;
let curNum = null;
let curOperator =null;
let prevOperator =null;
let total = 0;
let eqPressed = false;
const isValidNumber = (num) => /^(\d*)(\.\d*)?$/g.test(num);
let setRes =document.getElementById("result");

function isOperator(o) {
    if (o == '/' || o == '*' || o == '-' || o == '+' || o=='%' || o =='^' || o=='v') {
        return true;
    }
}
//CheckStatus redirects incoming key presses based on status: scientific/arithmetics
function checkStatus (c){
    console.log(scientific, c)
    if (scientific == true){
        sciCalc(c);
    }
    else {
        arithmeticCalc(c);
    }
}

//Handles key presses => operators and operands
function inputIntoEquation(c){
    let temp = numInStr + c;
    if (isValidNumber(temp)) {
        if (eqPressed){
            clearCalc();
            res='';
            eqPressed=false;
            prevNum=null;
            setRes.innerHTML= res;
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
function getCalcOnOperator(){
    if (prevNum && curNum && curOperator) {
        calcValuesArithmetic();
        res += curOperator;
        numInStr = '';
        prevOperator = curOperator;
        curOperator = null;
    }
}

function onOperator (c){
    if (eqPressed){
        eqPressed=false;
    }
        //assign the first number
    if (!prevNum) {
        prevNum = Number(numInStr);
        numInStr = '';
        total = prevNum;
    }
    //assign the second number if we have the first number
    else if (!curNum) {
        curNum = Number(numInStr)
        numInStr = '';
    }
    //assign operators
    if (!prevOperator) {
        prevOperator = c;
        res += c;
        setRes.innerHTML = res;
        return;
    } else {
        if (prevNum && prevOperator && !curNum) { //check if you need to reassign opeartor
            prevOperator = c
            res = res.slice(0, -1);
            res += c;
            setRes.innerHTML = res;
        } else { //or assign the next operator
            curOperator = c;
        }
    }
}
//Runs the calculation for Sci modes, taking into account order of operations
function sciCalcEval() {
        console.log("i got here")
        let inputStr = res;
        if (curOperator == '^' || prevOperator == '^') {
            inputStr = inputStr.replace('^', '**')
        }
        prevNum = eval(inputStr)
        if (curOperator == 'v') {
            prevNum = Math.pow(curNum, (1 / Number(numInStr)));
        }
        numInStr = ''
        console.log("vicky", curNum);
        curNum=null;
        setRes.innerHTML = res;
        total=prevNum;
        displayCalc();
}
// sciCalc function receives user input and manipulates it in a scientific mode. Adheres to
//order of operations.
function sciCalc (c) {
    inputIntoEquation(c);
    if (prevOperator && curOperator && prevNum && curNum && numInStr && isOperator(c)) {
        sciCalcEval();
    }
    if (isOperator(c)) {
        onOperator(c);
        if (!curOperator && prevNum && curNum) {
             return;
        }
        if (((prevOperator != "%" && prevOperator !='^' && prevOperator != '√')  && curOperator && prevNum && curNum && !numInStr)){
            console.log("i got in the return func")
            res +=c;
            setRes.innerHTML  = res;
            return
        }
        getCalcOnOperator();

    }
}


// arithmeticCalc function receives user input and manipulates it in non scientific mode
//runs calculations once we have two operands. No operations order followed.
function arithmeticCalc(c) {
    console.log("numinstr:", numInStr, "prevnum:", prevNum, "curNum", curNum, "preopearto", prevOperator, "curoperator", curOperator)
    inputIntoEquation(c);
    if (isOperator(c)) {
        onOperator(c);
        getCalcOnOperator();
    }
    console.log("numinstr:", numInStr, "prevnum:", prevNum, "curNum", curNum, "preopearto", prevOperator, "curoperator", curOperator)
}


//CalcValues performs the basic arithmetic calculations
function calcValuesArithmetic() {
    if (numInStr && prevNum && !curNum) {//handles the final number conversion from str to num
        curNum = Number(numInStr);
        numInStr = '';
    }
    if (prevOperator == '*') {
        total = prevNum * curNum;
    }
    if (prevOperator == '/') {
        if (curNum == 0) {
            alert("can't divide by zero")
            return
        }
        total = prevNum / curNum;
    }
    if (prevOperator == '+') {
        total = prevNum + curNum;
    }
    if (prevOperator == '-') {
        total = prevNum - curNum;
    }
    if (prevOperator == '%'){
        total=prevNum%curNum;
    }
    if (prevOperator =='^'){
        total = prevNum**curNum;
    }
    if (prevOperator == 'v'){
        total = eval (String(prevNum) + prevOperator + String(curNum))
    }
    //
    if ((numInStr && !prevNum) || (prevNum && !curNum)) { //handles multiple presses on "="
        total = prevNum;
    }
    prevNum = total;
    curNum = null;
    displayCalc();
}

function displayCalc (){
    historyRes = historyRes + res + "<br>";
    document.getElementById("historybody").innerHTML = historyRes;
    res = String(total);
    historyRes = historyRes + "=" + "<br>" + res + "<br>";
    setRes.innerHTML = res;
    document.getElementById("historybody").innerHTML = historyRes;
}

//Eq is triggered upon hitting the "=" sign.
function eq() {
    eqPressed=true;
    if (scientific==true){
        sciCalcEval();
    }
    else{
        calcValuesArithmetic();
    }
    clearCalc();
}

//clears the screen and all calculation data
function clearRes() {
    res='';
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
        console.log(res)
        setRes.innerHTML = res;
    } else if (prevOperator) {
        prevOperator = null;
        res = res.slice(0, -1);
        setRes.innerHTML = res;
    }
    else if (prevNum){
        prevNum=parseInt(String(prevNum/10));
        res=prevNum;
        numInStr=String(prevNum);
        setRes.innerHTML = res;
    }
}

//Handles the +/- sign.
function plusMinusFunc(){
    if (numInStr) {
        console.log("vicky")
        let newNumInStr = String(Number(numInStr) * (-1));
        res = res.replace(numInStr, newNumInStr)
        numInStr=newNumInStr;
        setRes.innerHTML = res;
    }
    else if (prevNum){
        let newNum = String((prevNum) * (-1));
        res = res.replace(String(prevNum), newNum)
        prevNum=newNum;
        setRes.innerHTML = res;
    }
}

function timesSquare(){
    if (numInStr){
        if (prevNum){
            curNum=Number(numInStr)*Number(numInStr)
            res= res.replace(numInStr, String(curNum))
            setRes.innerHTML = res
        }
        else{
            prevNum=Number(numInStr)*Number(numInStr);
            numInStr='';
            res=prevNum;
            setRes.innerHTML = res
            total=prevNum;
        }
    }
    else if (prevNum){
        curNum=Number(numInStr)*Number(numInStr)
        res= res.replace(numInStr, String(curNum))
        setRes.innerHTML = res
    }
    // displayCalc();
}

function rootFunc () {

}

function  setPie(){
    if (!numInStr){
        numInStr=String(Math.PI)
        res+=numInStr;
        setRes.innerHTML=res;
    }
}

// function calcMod(){
//
// }

function loadCalc() {
    scientific = false;
}

const numBtns = document.querySelectorAll('.numbutton')
numBtns.forEach(function (btn) {
    btn.addEventListener('click', () => checkStatus(btn.getAttribute('id')))
});

const opsBtns = document.querySelectorAll('.calcbutton')
opsBtns.forEach(function (btn) {
    btn.addEventListener('click', () => checkStatus(btn.getAttribute('value')))
});

document.getElementById('plusminus').addEventListener('click', plusMinusFunc);
document.getElementById('equal').addEventListener('click', eq);

document.addEventListener('DOMContentLoaded', loadCalc);
document.getElementById('square').addEventListener('click', timesSquare)

document.getElementById('root').addEventListener('click', rootFunc)

document.getElementById('pie').addEventListener('click', setPie)




    /**------------------------------------------------------------------------------------**/



