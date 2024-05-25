const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const volumeDownBtn = document.getElementById('volume-down');

function updateProgress() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.value = percentage;
}

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause-circle"></i>';
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play-circle"></i>';
  }
});

// Mudar o volume
volumeDownBtn.addEventListener('click', () => {
  audio.volume -= 0.1;
  if (audio.volume < 0) {
    audio.volume = 0;
  }
});

audio.addEventListener('timeupdate', updateProgress);

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});