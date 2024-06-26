const video = document.getElementById('my-video');
const testBtn = document.getElementById('test-btn');
testBtn.style.visibility='hidden';

const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const seekBar = document.getElementById('seek-bar');
const timestampCur = document.getElementById('timestamp-cur');
const timestampDur = document.getElementById('timestamp-dur');
const rewindSecBtn = document.getElementById('rewind-sec-btn');
const forwardSecBtn = document.getElementById('forward-sec-btn');
const rewindPercBtn = document.getElementById('rewind-perc-btn');
const forwardPercBtn = document.getElementById('forward-perc-btn');

const volumeBar = document.getElementById('volume-bar');
const muteBtn = document.getElementById('mute-btn');
const speedBtn = document.getElementById('speed-btn');
const fullscreenBtn = document.getElementById('full-screen-btn');

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

// Update progress & timestamp
function updateVideoTime() {
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
    timestampCur.innerHTML = `Current Time: ${hours}:${mins}:${secs}`;
    timestampDur.innerHTML = `Total Time: ${hourDur}:${minDur}:${secDur}`;
  } else {
    timestampCur.innerHTML = `Current Time: ${mins}:${secs}`;
    timestampDur.innerHTML = `Total Time: ${minDur}:${secDur}`;
  }

}



function gotoTime(step=0, relative=true) {
  let curTime = video.currentTime;
  let duration = video.duration;
  if (relative) {
    step += curTime;
    if (step < 0) step =0;
    else if (step > duration) step = duration;

  } else { // relative is false, so, jumping directly to the time
    if (step < 0) step =0;
    else if (step > duration) step = duration;

  }
  video.currentTime = step;

}

function gotoPercent(step=0, relative=true) {
  let duration = video.duration;
  let sec = duration * step / 100.0;
  gotoTime(sec, relative);
}

// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);

testBtn.addEventListener('click', () => {
  alert("Hello man!!!")
});

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);

// Seek functionality
seekBar.addEventListener('input', () => {
  const seekTime = (video.duration / 100) * seekBar.value;
  video.currentTime = seekTime;
});

// Calling funct to Update progress & timestamp
video.addEventListener('timeupdate', updateVideoTime);

rewindSecBtn.addEventListener('click', () => gotoTime(-10));
forwardSecBtn.addEventListener('click', () => gotoTime(10));
rewindPercBtn.addEventListener('click', () => gotoPercent(-1));
forwardPercBtn.addEventListener('click', () => gotoPercent(1));



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
fullscreenBtn.addEventListener('click', () => {
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

// Tests
/*
// Attach a function to the onkeydown event window
window.onkeydown = vidCtrl;

function vidCtrl(e) {
  const vid = document.querySelector('video');
  const key = e.code;

  if (key === 'ArrowLeft') {
    vid.currentTime -= 5;
    if (vid.currentTime < 0) {
      vid.pause();
      vid.currentTime = 0;
    }
  } else if (key === 'ArrowRight') {
    vid.currentTime += 5;
    if (vid.currentTime > vid.duration) {
      vid.pause();
      vid.currentTime = 0;
    }
  } else if (key === 'Space') {
    if (vid.paused || vid.ended) {
      vid.play();
    } else {
      vid.pause();
    }
  }
}
*/

window.addEventListener('keydown', function (evt) {
  const key = evt.code;
  // if (evt.keyCode  === 32) // Space
  if (key === 'Space') {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }

  } else if (key  === 'ArrowLeft') {
          //Left
          video.currentTime -= 10;
  } else if (key === 'ArrowRight') {
          //Right
          video.currentTime += 10;
          }
});

