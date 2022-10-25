// Elementlar:

const mute = document.getElementById("mute");

var isPlaying = false;
const playPause = document.getElementById("play-pause");

const playlist = document.getElementById("playlist");
const info = document.getElementById("info");
const infoButton = document.getElementById("info-button");

const music = document.createElement("audio");

const musiqaNomi = document.getElementsByTagName("marquee")[0];
const tartibi = document.getElementById("tartib");
const orqaFon = document.getElementById("orqa-fon");
const rasmOvozRasm = document.getElementById("rasm-ovoz-rasm");

const ovoz = document.getElementById("ovoz");

const davomiylik = document.getElementById("davomiylik");
const vaqtHolati = document.querySelectorAll("#vaqt-holati > span");

var ovozBalandligiQiymati = 100;

var indexRaqami = 0;

var timer = setInterval(davomiylikDoimiyOzgarishi, 500);

var isRepeating = false;
var isShuffling = false;

const playlistItemsBlock = document.getElementById("playlist-items");
const playlistItems = [];

// Baza:

const musicBase = [
  {
    nomi: "The Chainsmokers & Coldplay _ Something Just Like This",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Beethoven _ Moonlight Sonata",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Lana Del Rey _ Young and Beautiful",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Imagine Dragons _ Thunder",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Charlie Puth _ How Long",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Shohruhxon _ Ey yor",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Eminem _ Mockingbird",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Elvis Presley _ Always On My Mind",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Rusted Root _ Send Me On My Way",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Hans Zimmer _ Interstellar Main Theme (Extra Extended Soundtrack)",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "ACDC _ Thunderstruck",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Ray Charles _ Hit The Road Jack",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Michael Jackson _ Earth Song",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "El Padrino _ The Godfather Original Theme",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Taylor Swift _ Bad Blood (ft Kendrick Lamar)",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
  {
    nomi: "Sevara Nazarkhan _ Ota",
    musiqaManzili() {
      return `songs/${this.nomi}.mp3`;
    },
    musiqaRasmi() {
      return `url("images/${this.nomi}.jpg")`;
    },
  },
];

for (let i = 0; i < musicBase.length; i++) {
  let playlistItem = document.createElement("div");
  playlistItem.classList.add("playlist-item");
  let playlistItemIcon = document.createElement("span");
  playlistItemIcon.classList.add("material-symbols-outlined");
  playlistItemIcon.classList.add("playlist-item-button");
  playlistItemIcon.innerText = "play_arrow";
  let playlistItemName = document.createElement("p");
  playlistItemName.classList.add("playlist-item-name");
  playlistItemName.innerText = musicBase[i].nomi;
  playlistItem.classList.add("p" + i);
  playlistItemName.classList.add("p" + i);
  playlistItemIcon.classList.add("p" + i);
  playlistItem.appendChild(playlistItemIcon);
  playlistItem.appendChild(playlistItemName);
  playlistItemsBlock.appendChild(playlistItem);
  playlistItem.addEventListener("click", kerakliMusiqa, true);
}

// Funksional amallar:

function musiqaniYuklash() {
  let umumiySoniya = Math.floor(music.duration % 60);
  if(umumiySoniya<10) {
    umumiySoniya = "0" + umumiySoniya;
  }
  let umumiyDaqiqa = Math.floor(music.duration / 60);
  if(umumiyDaqiqa<10) {
    umumiyDaqiqa = "0" + umumiyDaqiqa;
  }
  vaqtHolati[0].innerText = `00:00`;
  vaqtHolati[2].innerText = `${umumiyDaqiqa}:${umumiySoniya}`;
  davomiylik.value = 0;
  tartibi.innerHTML = indexRaqami + " / " + musicBase.length;
  music.src = musicBase[indexRaqami].musiqaManzili();
  music.load();
  musiqaNomi.innerText = musicBase[indexRaqami].nomi;
  orqaFon.style.backgroundImage = musicBase[indexRaqami].musiqaRasmi();
  rasmOvozRasm.style.backgroundImage = musicBase[indexRaqami].musiqaRasmi();
}

musiqaniYuklash();

function ortgaOtkazish() {
  if (isShuffling) {
    indexRaqami = Math.floor(Math.random() * musicBase.length);
  }
  if (indexRaqami == 0) {
    indexRaqami = musicBase.length - 1;
  } else {
    indexRaqami--;
  }
  musiqaniYuklash();
  isPlaying = !isPlaying;
  playPauseF();
  for (let i = 0; i < musicBase.length; i++) {
    document.getElementsByClassName("playlist-item-button")[i].innerText =
      "play_arrow";
  }
  document.getElementsByClassName("playlist-item-button")[
    indexRaqami
  ].innerText = "pause";
}

function oldingaOtkazish() {
  if (isShuffling) {
    indexRaqami = Math.floor(Math.random() * musicBase.length);
  }
  if (indexRaqami == musicBase.length - 1) {
    indexRaqami = 0;
  } else {
    indexRaqami++;
  }
  musiqaniYuklash();
  isPlaying = !isPlaying;
  playPauseF();
  for (let i = 0; i < musicBase.length; i++) {
    document.getElementsByClassName("playlist-item-button")[i].innerText =
      "play_arrow";
  }
  document.getElementsByClassName("playlist-item-button")[
    indexRaqami
  ].innerText = "pause";
}

function playPauseF() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    playPause.innerText = "pause";
    music.play();
  } else {
    playPause.innerText = "play_arrow";
    music.pause();
  }
}

function showHidePlaylist() {
  if (playlist.classList.length == 0) {
    playlist.classList.add("open");
  } else {
    playlist.classList.remove("open");
  }
}

function ovozBalandligi() {
  ovozBalandligiQiymati = Number(ovoz.value);
  music.volume = ovozBalandligiQiymati / 100;
}

function MuteOnOff() {
  music.muted = !music.muted;
  if (music.muted) {
    mute.innerText = "volume_off";
  } else {
    mute.innerText = "volume_up";
  }
}

function davomiylikOzgarishi() {
  music.currentTime = (music.duration / 100) * Number(davomiylik.value);
}

function davomiylikDoimiyOzgarishi() {
  davomiylik.value = (music.currentTime / music.duration) * 100;
  // -------------------
  let hozirSoniya = Math.floor(music.currentTime % 60);
  if(hozirSoniya<10) {
    hozirSoniya = "0" + hozirSoniya;
  }
  let hozirDaqiqa = Math.floor(music.currentTime / 60);
  if(hozirDaqiqa<10) {
    hozirDaqiqa = "0" + hozirDaqiqa;
  }
  // -------------------
  let umumiySoniya = Math.floor(music.duration % 60);
  if(umumiySoniya<10) {
    umumiySoniya = "0" + umumiySoniya;
  }
  let umumiyDaqiqa = Math.floor(music.duration / 60);
  if(umumiyDaqiqa<10) {
    umumiyDaqiqa = "0" + umumiyDaqiqa;
  }
  // -------------------
  vaqtHolati[0].innerText = `${hozirDaqiqa}:${hozirSoniya}`;
  vaqtHolati[2].innerText = `${umumiyDaqiqa}:${umumiySoniya}`;
}

music.addEventListener("ended", () => {
  if (isRepeating) {
    indexRaqami--;
    oldingaOtkazish();
  } else {
    oldingaOtkazish();
  }
});

function kerakliMusiqa(event) {
  showHidePlaylist();
  indexRaqami = Number(event.target.classList[1].slice(1));
  musiqaniYuklash();
  isPlaying = false;
  playPauseF();
  for (let i = 0; i < musicBase.length; i++) {
    document.getElementsByClassName("playlist-item-button")[i].innerText =
      "play_arrow";
  }
  document.getElementsByClassName("playlist-item-button")[
    indexRaqami
  ].innerText = "pause";
}

function musicRepeat() {
  isRepeating = !isRepeating;
  if (isRepeating) {
    document.getElementById("repeat").innerText = "repeat_one";
  } else {
    document.getElementById("repeat").innerText = "repeat";
  }
}

function musicShuffle() {
  isShuffling = !isShuffling;
  if (isShuffling) {
    document.getElementById("shuffle").innerText = "shuffle_on";
  } else {
    document.getElementById("shuffle").innerText = "shuffle";
  }
}

function showHideInfo() {
  if(info.classList.length === 0) {
    info.classList.add("show");
    infoButton.innerText = "cancel";
  } else {
    info.classList.remove("show");
    infoButton.innerText = "info";
  }
}