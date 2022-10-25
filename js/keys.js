var audioPlayer = document.getElementById("audio-player");

document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    playPauseF();
  }
  if (e.key == "n") {
    oldingaOtkazish();
  }
  if (e.key == "p") {
    ortgaOtkazish();
  }
  if (e.key == "ArrowUp") {
    ovozKuchaytirish(10);
  }
  if (e.key == "ArrowDown") {
    ovozKuchaytirish(-10);
  }
  if (e.key == "ArrowLeft") {
    otkazish(-10);
  }
  if (e.key == "ArrowRight") {
    otkazish(10);
  }
  if (e.key == "m") {
    MuteOnOff();
  }
  if (e.key == "s") {
    musicShuffle();
  }
  if (e.key == "r") {
    musicRepeat()
  }
  if (e.key == "l") {
    showHidePlaylist();
  }
  if (e.key == "i") {
    showHideInfo();
  }
  if (e.key == "b") {
    if(audioPlayer.classList.length === 0) {
      audioPlayer.classList.add("bigger");
    } else {
      audioPlayer.classList.remove("bigger");
    }
  }
};

function ovozKuchaytirish(qiymat) {
  ovozBalandligiQiymati = Number(ovoz.value);
  ovoz.value = ovozBalandligiQiymati + qiymat;
  music.volume = ovozBalandligiQiymati / 100;
}

function otkazish(qiymat) {
  if(music.duration > music.currentTime + 10 && qiymat > 0) {
    music.currentTime += qiymat;
  } else if (music.currentTime > 10 && qiymat < 0) {
    music.currentTime += qiymat;
  } else if (music.currentTime < 10 && qiymat < 0) {
    music.currentTime = 0;
  }
}