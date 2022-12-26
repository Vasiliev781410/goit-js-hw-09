
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");

const changeColor = () =>{
    document.body.style.background = getRandomHexColor();
};

let intervalID = null;

function disableButton(elem,value) {
    elem.disabled = value;
};

disableButton(btnStop,true);

const clickStart = (event) =>{
    disableButton(event.target,true);
    disableButton(btnStop,false);
    intervalID = setInterval(changeColor,1000);    
};

const clickStop = (event) =>{
    disableButton(btnStart,false);
    clearInterval(intervalID); 
    disableButton(event.target,true);  
};

btnStart.addEventListener('click',clickStart);
btnStop.addEventListener('click',clickStop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }