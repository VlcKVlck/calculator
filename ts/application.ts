
function loadApp() {
    document.getElementById('scientific').style.visibility="hidden";
    document.getElementById('history').style.visibility="visible";
}


function settingsFunc(){
    alert ("Developed by: Vicky \nVersion: 0.0 \nDescription: This is a simple calculator");
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
        elem.style.visibility = 'visible';
        btn.style.border="inherit";
        scientific=false;
        clearRes ();

    }
}


document.getElementById('lightbulb').addEventListener("click", lightScreen)
document.getElementById('sciMode').addEventListener("click", sciMode)
document.addEventListener('DOMContentLoaded', loadApp)
