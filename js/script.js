const img = document.querySelector("img");
const music = document.querySelector("audio");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

const songs = [
  {
    name: "music-1",
    title: "Con Calma",
    artist: "Katy Perry",
  },
  {
    name: "music-2",
    title: "Tera Baap Aaya",
    artist: "Farhad B, Vikram M",
  },
  {
    name: "music-3",
    title: "Friends",
    artist: "Anne-Marie",
  },
  {
    name: "music-4",
    title: "Proper Patola",
    artist: "Diljit Dosanjh, Badshah",
  },
  {
    name: "music-5",
    title: "Shape of You",
    artist: "Ed Sheeran",
  },
];

let isplaying = false;

// play
const playmusic = () => {
  isplaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  document.getElementById("play").title = "Pause";
};

// pause
const pausemusic = () => {
  isplaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  document.getElementById("play").title = "Play";
};

play.addEventListener("click", () => {
  if (isplaying) {
    pausemusic();
  } else {
    playmusic();
  }
});

const loadsong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "music/" + songs.name + ".mp3";
  img.src = "images/" + songs.name + ".jpg";
};

index = 0;

const nextsong = () => {
  index = (index + 1) % songs.length;
  loadsong(songs[index]);
  playmusic();
};

const prevsong = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadsong(songs[index]);
  playmusic();
};

//PROGRESS BAR
let progress = document.getElementById("progress");
const total_duration = document.getElementById("duration");
let curr_time = document.getElementById("curr_time");

music.addEventListener("timeupdate", (event) => {
  //   console.log(event);
  const { currentTime, duration } = event.srcElement;
  let time = (currentTime / duration) * 100;
  progress.style.width = `${time}%`;

  //   curr duration update
  let min_currTime = Math.floor(currentTime / 60);
  let sec_currTime = Math.floor(currentTime % 60);
  if (sec_currTime < 10) sec_currTime = `0${sec_currTime}`;
  curr_time.textContent = `${min_currTime}:${sec_currTime}`;

  //   music duration update
  let minutes = Math.floor(duration / 60);
  let seconds = Math.floor(duration % 60);
  if (duration) {
    if (seconds < 10) seconds = `${seconds}0`;
    total_duration.textContent = `${minutes}:${seconds}`;
  }
});

// if you click in the middle of ongoing song
const progress_div = document.getElementById("progress_div");
progress_div.addEventListener("click", (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
  //   console.log(move_progress);
});

// if music gets ended then it should next song
music.addEventListener("ended", nextsong);

next.addEventListener("click", nextsong);
prev.addEventListener("click", prevsong);
