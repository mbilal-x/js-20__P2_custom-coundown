// get the url params
// get current date Time
// compare date Time
// DoM add Time
// reset Time

let countdownDate = '';
let countdownTitle = '';
let countdownTime = new Date();
let savedCountdown = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let myInterval;

// The 3 different screens
const scene1El = document.querySelector('.scene-1');
const scene2El = document.querySelector('.scene-2');
const scene3El = document.querySelector('.scene-3');
// The buttons
const resetBtnEl = document.querySelectorAll('.reset-btn');
// submit button has no use probably
const submitBtnEl = document.querySelector('.submit-btn');
// form element
const formEl = document.querySelector('.timer__form');
const dateEl = document.querySelector('input[type=date]');
// time spans
const timeEls = document.querySelectorAll('span');

let currentDate = new Date().toISOString().split('T')[0];
// set min attribute on the form date input
dateEl.setAttribute('min', currentDate);

//
function restorePrevCountdown() {
  savedCountdown = JSON.parse(localStorage.getItem('countdown'));

  if (localStorage.getItem('countdown')) {
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;

    countdownTime = new Date(countdownDate);
    countdownTime = countdownTime.getTime();

    updateDOM();
  }
}

// populated countdown
function updateDOM() {
  myInterval = setInterval(() => {
    let now = Date.now();
    let distance = countdownTime - now;

    let days = Math.floor(distance / day);
    let hours = Math.floor((distance % day) / hour);
    let minutes = Math.floor((distance % hour) / minute);
    let seconds = Math.floor((distance % minute) / second);

    timeEls[0].textContent = days;
    timeEls[1].textContent = hours;
    timeEls[2].textContent = minutes;
    timeEls[3].textContent = seconds;

    scene1El.style.display = 'none';
    scene2El.style.display = 'block';

    completeCountdown(distance);
  }, 1000);
}

function updateCountDown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  countdownTime = new Date(countdownDate);
  countdownTime = countdownTime.getTime();

  countdownStore = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(countdownStore));

  updateDOM();
}

//
function completeCountdown(distance) {
  if (distance < 0) {
    localStorage.removeItem('countdown');
    clearInterval(myInterval);
    scene2El.style.display = 'none';
    scene3El.style.display = 'block';
  }
}

function reset() {
  scene1El.style.display = 'block';
  scene2El.style.display = 'none';
  scene3El.style.display = 'none';
  localStorage.removeItem('countdown');
  clearInterval(myInterval);
}

// event handlers
formEl.addEventListener('submit', updateCountDown);
resetBtnEl.forEach((item) => item.addEventListener('click', reset));

// on load
restorePrevCountdown();
