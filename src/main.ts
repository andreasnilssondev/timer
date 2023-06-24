import './style.css';

const startPauseButton = document.querySelector<HTMLButtonElement>(
  '[data-js="start-pause"]'
)!;
const resetButton =
  document.querySelector<HTMLButtonElement>('[data-js="reset"]')!;
const timerMinutesElement = document.querySelector<HTMLSpanElement>(
  '[data-js="timer-minutes"]'
)!;
const timerSecondsElement = document.querySelector<HTMLSpanElement>(
  '[data-js="timer-seconds"]'
)!;
const timerMilliSecondsElement = document.querySelector<HTMLSpanElement>(
  '[data-js="timer-milliseconds"]'
)!;

let startTime: number | null = null;
let pauseTime: number | null = null;
let timePassed = 0;
let isRunning = false;

function render() {
  timerMinutesElement.innerHTML = Math.floor((timePassed / 1000 / 60) % 60)
    .toString()
    .padStart(2, '0');
  timerSecondsElement.innerHTML = Math.floor((timePassed / 1000) % 60)
    .toString()
    .padStart(2, '0');
  timerMilliSecondsElement.innerHTML = Math.floor(timePassed % 1000)
    .toString()
    .padStart(3, '0');
}

function loop() {
  if (isRunning === false) {
    return;
  }

  // call requestAnimationFrame before running the update logic so the browser can plan ahead
  requestAnimationFrame(loop);

  const now = new Date().getTime();

  if (startTime === null) {
    // Handle the first update
    startTime = now;
    return;
  }

  if (pauseTime !== null) {
    startTime = now - timePassed;
    pauseTime = null;
  }

  timePassed = now - startTime;

  render();
}

function pause() {
  isRunning = false;
  startPauseButton.innerHTML = 'Resume';
  pauseTime = new Date().getTime();
  startPauseButton.addEventListener('click', start, { once: true });
}

function start() {
  isRunning = true;
  startPauseButton.innerHTML = 'Pause';
  startPauseButton.addEventListener('click', pause, { once: true });
  requestAnimationFrame(loop);
}

startPauseButton.addEventListener('click', start, { once: true });
resetButton.addEventListener('click', () => {
  // TODO: fix issues
  isRunning = false;
  startPauseButton.innerHTML = 'Start';
  startTime = null;
  pauseTime = null;
  timePassed = 0;
  render();
});
