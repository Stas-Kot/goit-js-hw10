import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('.value[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

document.addEventListener('DOMContentLoaded', () => (btn.disabled = true));
btn.addEventListener('click', handleStartClick);

let timeToStop;
let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    timeToStop = selectedDates[0] - new Date();

    if (selectedDates[0] - new Date() < 0) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
        messageColor: 'white',
        backgroundColor: 'red',
        transitionIn: 'fadeIn',
        timeout: 3500,
      });
      btn.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    btn.disabled = false;
  },
};

flatpickr(input, options);

function handleStartClick(e) {
  input.disabled = true;
  btn.disabled = true;
  updateTimerface(convertMs(timeToStop));

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    let deltaTime = userSelectedDate - currentTime;
    const time = convertMs(deltaTime);

    if (deltaTime <= 999) {
      clearInterval(intervalId);
      input.disabled = false;
    }
    updateTimerface(time);
  }, 1000);
}

function updateTimerface({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
