var audio = document.getElementById('audio');
var playPauseBtn = document.getElementById('playPauseBtn');
var count = 0;

function playPause(){
    if (count == 0){
        count = 1;
        audio.play();
        playPauseBtn.innerHTML = "Mute &#9208;";
    }else{
        count = 0;
        audio.pause();
        playPauseBtn.innerHTML = "Musica &#9658;";
    }
}

function cargarBody(){
    playPause();
}