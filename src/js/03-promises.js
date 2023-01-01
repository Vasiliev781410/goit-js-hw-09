import Notiflix from 'notiflix';

// получим элементы
const form = document.querySelector(".form");
const inpDelay = document.querySelector("input[name='delay']");
const inpDelayStep = document.querySelector("input[name='step']");
const inpAmount = document.querySelector("input[name='amount']");

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const promiseData = {position: position, delay: delay};
      if (shouldResolve) {           
        resolve(promiseData);
      } else { 
        reject(promiseData);   
      };
    }, delay);
  });  
};




const promiseGenerate = (event) =>{
  event.preventDefault();
  let currentDelay = 0; 
  for (let i = 1; i <= (inpAmount.value); i++) {
    if (i === 1) {
      currentDelay += parseInt(inpDelay.value); 
    } else {
      currentDelay += parseInt(inpDelayStep.value); 
    }        
    createPromise(i,currentDelay)
    .then(({ position, delay }) => {
      //console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);  
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`,
      {
        timeout: currentDelay,
      },);
    })
    .catch(({ position, delay }) => {
      //console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`,
      {
        timeout: currentDelay,
      },);
    });
  }
};

form.addEventListener("submit",promiseGenerate);

