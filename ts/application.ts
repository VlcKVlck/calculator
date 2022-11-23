

const versionInfo={
    "Developed by": "Vicky",
    "Version": "0.0",
    "Description": "This is a simple calculator",
}
let params=null;
function loadApp() {
    document.getElementById("pagebody").className="dark";
    document.getElementById('scientific').style.visibility="hidden";
    document.getElementById('history').style.visibility="visible";
    document.getElementById('info').style.visibility ="none";
    if (window.location.search){
        params = new URLSearchParams (window.location.search)
        let color= params.get('backgroundcolors');
        let font = params.get('fontfamilyselector')
        let theme = params.get('theme')
        console.log(color, font, theme)
        document.getElementById("site").style.backgroundColor =color;
        document.getElementById("pagebody").className=theme;
        document.getElementById("title").style.fontFamily = font;
    }
    scientific=false;
}








//hide/show history
function hideHistory(){
    const elem =document.getElementById("history");
    const btn = document.getElementById("historybtn");
    if (elem.style.visibility=='visible'){
        elem.style.visibility = 'hidden';
        btn.style.border="5px solid black";

    }
    else{
        elem.style.visibility = 'visible';
        btn.style.border="inherit";

    }
}

function lightScreen (){
    const elem = document.getElementById('result')
    const btn = document.getElementById('lightbulb')
    if (elem.style.backgroundColor=='yellow') {
        btn.style.border='none'
        elem.style.backgroundColor = "inherit";
        }else{
        elem.style.backgroundColor='yellow';
        btn.style.border = '5px solid black';
    }

}
function sciMode(){
    const elem =document.getElementById('scientific');
    const btn = document.getElementById("sciMode");
    if (scientific==false){
        elem.style.visibility = 'visible';
        btn.style.border="5px solid black";
        scientific=true;
        clearRes ();
    }
    else{
        elem.style.visibility = 'hidden';
        btn.style.border="inherit";
        scientific=false;
        clearRes ();

    }
}

function displayInfo () {
    let displayText =''
    document.getElementById('myPopup').classList.toggle("show");
     Object.keys(versionInfo).forEach(key=>{
        displayText = displayText + key + ":"+ versionInfo[key] +"\n";
    })
    document.getElementById('myPopup').innerHTML =displayText;

}


document.getElementById('lightbulb').addEventListener("click", lightScreen);
document.getElementById('sciMode').addEventListener("click", sciMode);
document.getElementById('info').addEventListener("click", displayInfo);
document.addEventListener('DOMContentLoaded', loadApp);

