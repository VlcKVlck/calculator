


//Input handeling (parsing, clearing, displaying) and simple arithmetics
/**-----------------------------------------------------------------------------**/
let scientific = false;
let remote=false;
let numInStr = ''; //holds the string value of the input until converts to num
let res =''; //The output string displayed to user
let historyRes = ''; //Displays history
let prevNum = null;
let curNum = null;
let curOperator =null;
let prevOperator =null;
let total = 0;
let eqPressed = false;
const mathJsURL = "http://api.mathjs.org/v4/?expr=";
const isValidNumber = (num) => /^(\d*)(\.\d*)?$/g.test(num);
let setRes =document.getElementById("result");

function isOperator(o) {
    if (o == '/' || o == '*' || o == '-' || o == '+' || o=='%' || o =='^' || o=='√') {
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
    console.log("yo")
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
    if (!res){
        return
    }
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
        if (remote==true){
            remoteMode(inputStr);
            return;
        }
        prevNum = eval(inputStr)
        if (curOperator == '√') {
            curNum = Math.pow(curNum, (1 / prevNum));
            // prevNum = eval (res.replace())
        }
        if (prevOperator == '√'){
            prevNum = Math.pow(prevNum, (1 / Number(numInStr)));
        }
        numInStr = ''
        console.log("vicky", curNum);
        curNum=null;
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
    inputIntoEquation(c);
    if (isOperator(c)) {
        onOperator(c);
        getCalcOnOperator();
    }
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
        total = Math.pow(curNum, (1 / prevNum))
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
            res = res.replace(numInStr, curNum);
            numInStr='';
            setRes.innerHTML = res
        }
        else{
            prevNum=Number(numInStr)*Number(numInStr);
            res=numInStr +"^" + 2;
            numInStr='';
            setRes.innerHTML = res
            total=prevNum;
            displayCalc();
        }
    }
    else if (prevNum){
        curNum=prevNum*prevNum
        res = res.replace(prevNum, curNum);
        numInStr='';
        setRes.innerHTML = res
    }
}

function rootFunc () {
    if (numInStr){
        if (prevNum){
            if (prevNum <0){
                alert (Error)
            }
            curNum=Math.pow(prevNum, 1/2)
            res = res.replace(numInStr, curNum);
            numInStr='';
            setRes.innerHTML = res
        }
        else{
            if (Number(numInStr) <0){
                alert (Error)
            }
            prevNum= Math.pow(Number(numInStr), 1/2);
            res="v" + numInStr ;
            numInStr='';
            setRes.innerHTML = res
            total=prevNum;
            displayCalc();
        }
    }
    else if (prevNum){
        if (prevNum <0){
            alert (Error)
        }
        curNum=Math.pow(prevNum, 1/2);
        numInStr='';
        res ='√' + prevNum;
        total=curNum;
        displayCalc();
    }

}

function  setPie(){
    if (!numInStr){
        numInStr=String(Math.PI)
        res+=numInStr;
        setRes.innerHTML=res;
    }
}

function calcFactorial(num){
    let total = 1;
    for (let j=1; j<(num+1); j++){
        total = total*j;
    }
    return total;
}

function factorialFunc (){
    if (numInStr){
        if (prevNum){
            curNum=calcFactorial (Number(numInStr))
            res = res.replace(numInStr, curNum);
            numInStr='';
            setRes.innerHTML = res
        }
        else{
            prevNum=calcFactorial (Number(numInStr));
            res=numInStr +"!";
            numInStr='';
            setRes.innerHTML = res
            total=prevNum;
            displayCalc();
        }
    }
    else if (prevNum){
        curNum=calcFactorial (prevNum)
        res = res.replace(prevNum, curNum);
        numInStr='';
        setRes.innerHTML = res
    }
}

 function remoteMode(x) {
     console.log("entered")
     let URL = mathJsURL + encodeURIComponent(x);
     setTimeout(() => {
         try {
             remoteCalc(URL);
         } catch {
             alert("Error. Please try the local calculator");
         }
     }, 2000)
 }

 // >>>>>>>>>>>FETCH WITH TIMEOUT<<<<<<<<<
//ABORT CONTROLLER

function remoteCalc (URL){
    fetch(URL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            total=data;
            document.getElementById('result').innerHTML = String(total);
            displayCalc();
        })
        .catch(function () {
            alert("Error. Please try the local calculator");
        })
}

function base2Func(){
    fetch("https://networkcalc.com/api/binary/"+ numInStr+ "?from=10")
    .then(function (response) {
        console.log(response);
        return response.json();
    })
        .then(function (data) {
            console.log(data)
            total=Number(data.converted);
            document.getElementById('result').innerHTML = String(total);
            displayCalc();
        })
        .catch(function () {
            alert("Error. Please try the local calculator");
        })

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
document.getElementById('square').addEventListener('click', timesSquare)
document.getElementById('root').addEventListener('click', rootFunc)
document.getElementById('pie').addEventListener('click', setPie)
document.getElementById('factorial').addEventListener('click', factorialFunc)
document.getElementById('base2').addEventListener('click', base2Func)




