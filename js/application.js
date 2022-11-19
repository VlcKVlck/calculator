
function settingsFunc(){
    alert ("Developed by: Vicky \nVersion: 0.0 \nDescription: This is a simple calculator");
}

//change themes
function changeTheme(){
    const a = document.getElementById("pagebody");
    if (a.className==='dark'){
        a.className='bright';
        }
    else  {
        a.className='dark';
        }
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