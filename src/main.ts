import './style.css';
 
const startButton =
  document.querySelector<HTMLButtonElement>('[data-js="start"]')!;
const stopButton =
  document.querySelector<HTMLButtonElement>('[data-js="stop"]')!;
const timerMinutesElement = document.querySelector<HTMLSpanElement>(
  '[data-js="timer-minutes"]'
)!;
const timerSecondsElement = document.querySelector<HTMLSpanElement>(
  '[data-js="timer-seconds"]'
)!;
const timerMilliSecondsElement = document.querySelector<HTMLSpanElement>(
  '[data-js="timer-milliseconds"]'
)!;

let isRunning = false;

function updateTimer(timestamp: DOMHighResTimeStamp) {
  if (isRunning) {
    timerMinutesElement.innerHTML = Math.floor((timestamp / 1000 / 60) % 60)
      .toString()
      .padStart(2, '0');
    timerSecondsElement.innerHTML = Math.floor((timestamp / 1000) % 60)
      .toString()
      .padStart(2, '0');
    timerMilliSecondsElement.innerHTML = Math.floor(timestamp % 1000)
      .toString()
      .padStart(3, '0');
    requestAnimationFrame(updateTimer);
  }
}

function start() {
  isRunning = true;
  requestAnimationFrame(updateTimer);
}

function stop() {
  isRunning = false;
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
