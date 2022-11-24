var versionInfo = {
    "Developed by": "Vicky",
    "Version": "0.0",
    "Description": "This is a simple calculator"
};
var params = null;
function loadApp() {
    document.getElementById("pagebody").className = "dark";
    document.getElementById('scientific').style.visibility = "hidden";
    document.getElementById('info').style.visibility = "none";
    document.getElementById("historybtn").click();
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
    scientific = false;
}
//hide/show history
function hideHistory() {
    var elem = document.getElementById("history");
    var btn = document.getElementById("historybtn");
    if (elem.style.visibility == 'visible') {
        elem.style.visibility = 'hidden';
        btn.style.border = "inherit";
    }
    else {
        elem.style.visibility = 'visible';
        btn.style.border = "5px solid black";
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
        elem.style.visibility = 'hidden';
        btn.style.border = "inherit";
        scientific = false;
        clearRes();
    }
}
function remoteModeStart() {
    var btn = document.getElementById("cloud");
    if (remote == false) {
        btn.style.border = "5px solid black";
        remote = true;
        scientific = true;
    }
    else {
        btn.style.border = "inherit";
        remote = false;
        scientific = false;
    }
}
function displayInfo() {
    var displayText = '';
    document.getElementById('myPopup').classList.toggle("show");
    Object.keys(versionInfo).forEach(function (key) {
        displayText = displayText + key + ":" + versionInfo[key] + "\n";
    });
    document.getElementById('myPopup').innerHTML = displayText;
}
document.getElementById('lightbulb').addEventListener("click", lightScreen);
document.getElementById('sciMode').addEventListener("click", sciMode);
document.getElementById('info').addEventListener("click", displayInfo);
document.getElementById('cloud').addEventListener('click', remoteModeStart);
document.addEventListener('DOMContentLoaded', loadApp);
