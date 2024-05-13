const video = document.getElementById('my-video');
const playBtn = document.getElementById('play-btn');
// const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const seekBar = document.getElementById('seek-bar');
const timestamp = document.getElementById('timestamp');
const volumeBar = document.getElementById('volume-bar');
const muteBtn = document.getElementById('mute-btn');
const speedBtn = document.getElementById('speed-btn');
const fullscreenButton = document.getElementById('full-screen-btn');

// Play & pause video
function toggleVideoStatus() {
    if (video.paused || video.endded) {
        video.play();
    } else {
        video.pause();
    }
}


// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// update play/pause icon
function updatePlayIcon() {
    if (video.paused) {
        // play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
        playBtn.innerHTML = "Play"
    } else {
        // play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
        playBtn.innerHTML = "Pause"
    }
}

/*
// Play/Pause Functionality
playBtn.addEventListener('click', () => {
  video.play();
});
*/

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

playBtn.addEventListener('click', toggleVideoStatus);
// pauseBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);

/*
pauseBtn.addEventListener('click', () => {
  video.pause();
});
*/

// Seek functionality
seekBar.addEventListener('input', () => {
  const seekTime = (video.duration / 100) * seekBar.value;
  video.currentTime = seekTime;
});

// Update seek bar as video plays
// Update progress & timestamp
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progress = (currentTime / duration) * 100;
  seekBar.value = progress;

  let isHourDur = false;
  // Get hours for current time
  let hours = Math.floor(video.currentTime / 3600);
  if (hours < 10) {
    hours = '0' + String(hours);
  }

  
  // Get minutes for current time
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get seconds for current time
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
      secs = '0' + String(secs);
  }
  
  // Get hours for duration
  let hourDur = Math.floor(video.duration / 3600);
  if (hourDur > 0) {
    isHourDur = true;
  } 
  if (hourDur < 10) {
    hourDur = '0' + String(hourDur);
  }

 // Get minutes for duration
  let minDur = Math.floor(video.duration / 60);
  if (minDur < 10) {
    minDur = '0' + String(minDur);
  }

  // Get seconds for duration
  let secDur = Math.floor(video.duration % 60);
  if (secDur < 10) {
      secDur = '0' + String(secDur);
  }

  if (isHourDur) {
    timestamp.innerHTML = `${hours}:${mins}:${secs} / ${hourDur}:${minDur}:${secDur}`;
  } else {
    timestamp.innerHTML = `${mins}:${secs} / ${minDur}:${secDur}`;
  }

});

// Volume functionality
volumeBar.addEventListener('input', () => {
  video.volume = volumeBar.value;
});

// Mute functionality
muteBtn.addEventListener('click', () => {
  if (video.volume === 0) {
    // Unmute
    video.volume = 1;
    muteBtn.textContent = 'Mute';
  } else {
    // Mute
    video.volume = 0;
    muteBtn.textContent = 'Unmute';
  }
});

// Playback speed functionality
speedBtn.addEventListener('click', () => {
  const currentSpeed = video.playbackRate;
  if (currentSpeed === 1) {
    // Set playback speed to 1.5x
    video.playbackRate = 1.5;
    speedBtn.textContent = 'Speed: 1.5x';
  } else if (currentSpeed === 1.5) {
    // Set playback speed to 2x
    video.playbackRate = 2;
    speedBtn.textContent = 'Speed: 2x';
  } else {
    // Set playback speed to 1x (default)
    video.playbackRate = 1;
    speedBtn.textContent = 'Speed: 1x';
  }
});

// Fullscreen functionality
fullscreenButton.addEventListener('click', () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
});

