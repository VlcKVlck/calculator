var params = null;
function loadApp() {
    document.getElementById('scientific').style.visibility = "hidden";
    document.getElementById('history').style.visibility = "visible";
    if (window.location.search) {
        params = new URLSearchParams(window.location.search);
        var color = params.get('backgroundcolors');
        var font = params.get('fontfamilyselector');
        var theme = params.get('theme');
        console.log(color, font, theme);
        document.getElementById("site").style.backgroundColor = color;
        document.getElementById("pagebody").className = theme;
        document.getElementById("title").style.fontFamily = font;
    }
}
function settingsFunc() {
    alert("Developed by: Vicky \nVersion: 0.0 \nDescription: This is a simple calculator");
}
// //change themes
// function changeTheme(){
//     const a = document.getElementById("pagebody");
//     if (a.className==='dark'){
//         a.className='bright';
//         }
//     else  {
//         a.className='dark';
//         }
// }
//hide/show history
function hideHistory() {
    var elem = document.getElementById("history");
    var btn = document.getElementById("historybtn");
    if (elem.style.visibility == 'visible') {
        elem.style.visibility = 'hidden';
        btn.style.border = "5px solid black";
    }
    else {
        elem.style.visibility = 'visible';
        btn.style.border = "inherit";
    }
}
function lightScreen() {
    var elem = document.getElementById('result');
    var btn = document.getElementById('lightbulb');
    if (elem.style.backgroundColor == 'yellow') {
        btn.style.border = 'none';
        elem.style.backgroundColor = "inherit";
    }
    else {
        elem.style.backgroundColor = 'yellow';
        btn.style.border = '5px solid black';
    }
}
function sciMode() {
    var elem = document.getElementById('scientific');
    var btn = document.getElementById("sciMode");
    if (scientific == false) {
        elem.style.visibility = 'visible';
        btn.style.border = "5px solid black";
        scientific = true;
        clearRes();
    }
    else {
        elem.style.visibility = 'visible';
        btn.style.border = "inherit";
        scientific = false;
        clearRes();
    }
}
// function siteConfig (){
//     let siteBG = document.getElementById("site").style.backgroundColor;
//     if (color =='red'){
//         document.getElementById("site").style.backgroundColor ="red";
//
//     }
//
// }
document.getElementById('lightbulb').addEventListener("click", lightScreen);
document.getElementById('sciMode').addEventListener("click", sciMode);
document.addEventListener('DOMContentLoaded', loadApp);
// document.querySelector('submit').addEventListener(onsubmit());
// const bgColors = document.querySelectorAll('option');
// bgColors.forEach(function(bgColor){
//     bgColor.addEventListener('select', () => changeColor(bgColor.getAttribute('value')
// })
// const a = document.querySelector("#backgroundcolors").getAttribute('value');
// console.log (a)
