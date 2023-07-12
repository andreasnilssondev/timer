import { getHtmlElement } from './getHtmlElement';
import { formatTime } from './formatTime';
import './style.css';

const startPauseButton = getHtmlElement<HTMLButtonElement>('start-pause')!;
const resetButton = getHtmlElement<HTMLButtonElement>('reset')!;
const timerMinutesElement = getHtmlElement<HTMLSpanElement>('timer-minutes')!;
const timerSecondsElement = getHtmlElement<HTMLSpanElement>('timer-seconds')!;
const timermsElement = getHtmlElement<HTMLSpanElement>('timer-milliseconds')!;
const stateElement = getHtmlElement<HTMLSpanElement>('state')!;

let startTime: number | null = null;
let pauseTime: number | null = null;
let timePassed = 0;
let isRunning = false;

function render() {
  timerMinutesElement.textContent = formatTime((timePassed / 1000 / 60) % 60);
  timerSecondsElement.textContent = formatTime((timePassed / 1000) % 60);
  timermsElement.textContent = formatTime((timePassed % 1000) / 10);
}

function loop() {
  if (!isRunning) {
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
    // Handle the pause, by removing the time passed during the pause from the start time
    startTime = now - timePassed;
    pauseTime = null;
  }

  timePassed = now - startTime;

  render();
}

function pause() {
  isRunning = false;
  stateElement.setAttribute('data-state', 'paused');
  pauseTime = new Date().getTime();
  startPauseButton.addEventListener('click', start, { once: true });
}

function start() {
  isRunning = true;
  stateElement.setAttribute('data-state', 'started');
  startPauseButton.addEventListener('click', pause, { once: true });
  requestAnimationFrame(loop);
}

function cleanup() {
  startPauseButton.removeEventListener('click', pause);
  startPauseButton.removeEventListener('click', start);
  startPauseButton.addEventListener('click', start, { once: true });
  isRunning = false;
  stateElement.setAttribute('data-state', 'stopped');
  startTime = null;
  pauseTime = null;
  timePassed = 0;
  render();
}

resetButton.addEventListener('click', cleanup);
startPauseButton.addEventListener('click', start, { once: true });
