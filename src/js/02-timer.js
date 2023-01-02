import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

// получим элементы
const myInput = document.querySelector("input[type='text']");
const btnStart = document.querySelector("[data-start]");
const spanDays = document.querySelector("[data-days]");
const spanHours = document.querySelector("[data-hours]");
const spanMinutes = document.querySelector("[data-minutes]");
const spanSeconds = document.querySelector("[data-seconds]");
const timerData = document.querySelector(".timer");
const timerDataFields = document.querySelectorAll(".field");
const timerDataValues = document.querySelectorAll(".value");
const timerDataLabels = document.querySelectorAll(".label");
// сделаем минимальное оформление элементов
timerData.style.display = "flex";
timerData.style.gap = "10px";
timerDataFields.forEach(elem =>   elem.style.display = 'block');
timerDataValues.forEach(elem => {
    elem.style.display = 'block';
    elem.style.textAlign = 'center';
    elem.style.verticalAlign = 'bottom';  
    elem.style.margin = '0px';
    elem.style.fontWeight = '500';
    elem.style.fontSize = '30px';   
});
timerDataLabels.forEach(elem => {
    elem.style.display = 'block';  
    elem.style.textTransform = 'uppercase';
    elem.style.marginTop = '-8px';
    elem.style.fontSize = '12px'; 
});
btnStart.disabled = true;
 // библиотека flatpickr
 const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {         
        if (selectedDates[0].getTime() > Date.now()){                        
            btnStart.disabled = false; 
            finDate = selectedDates[0].getTime();                            
        } else{
           // window.alert("Please choose a date in the future");
           Notiflix.Notify.failure("Please choose a date in the future"); 
            btnStart.disabled = true;    
        }  
    },
};  
const fp = flatpickr(myInput, options); 

// опишем наш класс таймер обратного отсчета
class СountdownTimer{    
    constructor(newStartDate, newFinalDate,{onTick}){        
        this.startDate = newStartDate;
        this.finalDate = newFinalDate;
        this.onTick = onTick; 
        this.timerID = null;      
    }
    // get startDate() {
    // return this.startDate;
    // } 
    // set startDate(newStartDate) {
        // this.startDate = newStartDate;
    // }
    // get finalDate() {
        // return this.finalDate;
    // }
    // set finalDate(newfinalDate) {            
        // this.finalDate = newfinalDate;       
    // }
    count(){
        let difference = this.finalDate - this.startDate;        
        let diffInDays = null;

        this.timerID = setInterval(() => {
            if (difference < 1000) {
                if (this.timerID !== null){
                    clearInterval(this.timerID);
                    this.timerID = null;
                }
                return;
             }                       
            difference -= 1000;
            diffInDays = this.convertMs(difference); 
            this.onTick(diffInDays); 
        }, 1000);       
        
        return this.timerID;
    }
    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      }
 };
// отрисовка интерфейса согласно данных таймера      
const updateInterface = (diffInDays) =>{
    spanDays.textContent = String(diffInDays.days).padStart(2,'0');
    spanHours.textContent = String(diffInDays.hours).padStart(2,'0');
    spanMinutes.textContent = String(diffInDays.minutes).padStart(2,'0');
    spanSeconds.textContent = String(diffInDays.seconds).padStart(2,'0');
};
// процедура запуска таймера
let intervalID = null;

const start = () => {  
    if (intervalID !== null){
        clearInterval(intervalID);
    }
    btnStart.disabled = true;    
    const startDate = Date.now(); 
    const finalDateUser = new Date(myInput.value);
    const timerReverse = new СountdownTimer(startDate,finalDateUser.getTime(),{onTick: updateInterface});
    intervalID = timerReverse.count();  
}
// прослушка клика Старт
btnStart.addEventListener("click", start);




