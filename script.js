const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
// const songs = [
//   {
//     name: 'jacinto-1',
//     displayName: 'Electric Chill Machine',
//     artist: 'Jacinto Design'
//   },
//   {
//     name: 'jacinto-2',
//     displayName: 'Seven Nation Army (Remix)',
//     artist: 'Jacinto Design'
//   },
//   {
//     name: 'jacinto-3',
//     displayName: 'Goodnight, Disco Queen',
//     artist: 'Jacinto Design'
//   },
//   {
//     name: 'metric-1',
//     displayName: 'Front Row (Remix)',
//     artist: 'Metric/Jacinto Design'
//   }
// ];

const songs = [
  {
    name: 'ba-1',
    displayName: 'Don\'t Look Back',
    artist: 'DJ Gollum'
  },
  {
    name: 'ba-2',
    displayName: 'Hero',
    artist: 'Nick Skitz & Technoposse'
  },
  {
    name: 'ba-3',
    displayName: 'I Live For That Energy',
    artist: 'Armin Van Buuren'
  },
  {
    name: 'ba-4',
    displayName: 'For You',
    artist: 'Tough Diamond'
  },
  {
    name: 'ba-5',
    displayName: 'The Universe',
    artist: 'Hardwell'
  },
  {
    name: 'ba-6',
    displayName: 'Rock the party',
    artist: 'Nick Skitz & Raverockers ft.'
  }
];



// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
   songIndex++;
   if (songIndex > songs.length - 1) {
     songIndex = 0;
   }
   loadSong(songs[songIndex]);
   playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(event) {
  if (isPlaying) {
    const { duration, currentTime } = event.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime  % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);