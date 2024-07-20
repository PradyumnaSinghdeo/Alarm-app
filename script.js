document.getElementById('start-timer').addEventListener('click', startNewTimer);

let timers = [];

function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please set a valid time.");
    return;
  }

  const totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;
  const timerId = new Date().getTime();
  const timer = {
    id: timerId,
    timeRemaining: totalTimeInSeconds
  };

  timers.push(timer);
  renderTimers();
  startTimerInterval(timerId);
}

function renderTimers() {
  const timersContainer = document.getElementById('timers-container');
  timersContainer.innerHTML = '';
  timers.forEach(timer => {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.setAttribute('data-id', timer.id);

    const timeSpan = document.createElement('span');
    timeSpan.textContent = formatTime(timer.timeRemaining);

    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Timer';
    stopButton.addEventListener('click', () => stopTimer(timer.id));

    timerDiv.appendChild(timeSpan);
    timerDiv.appendChild(stopButton);

    timersContainer.appendChild(timerDiv);
  });
}

function startTimerInterval(timerId) {
  const timerInterval = setInterval(() => {
    const timer = timers.find(t => t.id === timerId);

    if (!timer) {
      clearInterval(timerInterval);
      return;
    }

    timer.timeRemaining--;

    if (timer.timeRemaining <= 0) {
      clearInterval(timerInterval);
      endTimer(timerId);
    }

    renderTimers();
  }, 1000);
}

function stopTimer(timerId) {
  timers = timers.filter(timer => timer.id !== timerId);
  renderTimers();
}

function endTimer(timerId) {
  const timer = timers.find(t => t.id === timerId);
  if (!timer) return;

  const timerDiv = document.querySelector(`.timer[data-id="${timer.id}"]`);
  timerDiv.classList.add('ended');
  timerDiv.querySelector('button').remove();

  const audio = new Audio('https://www.soundjay.com/button/sounds/beep-07.mp3');
  audio.play();

  setTimeout(() => {
    timers = timers.filter(timer => timer.id !== timerId);
    renderTimers();
  }, 5000);
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
