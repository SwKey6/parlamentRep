const video = document.getElementById('f7');
const btnPause = document.getElementById('f8');
const btnMute = document.getElementById('f9');
const videoTitle = document.getElementById('f10');
const videoText = document.getElementById('f11');
const playlist=['video1', 'video2']
const title=['Мы Мытищи', '8 марта']
const text=['Пресс-центр', 'Пресс-центр']
let count = 0;

function play(){
    if(video.paused){
        video.play();
        btnPause.innerText = 'Пауза';
    }
    else{
        video.pause();
        btnPause.innerText = 'Играть';
    }
}

function mute(){
    if(video.muted){
        video.muted = false;
        btnMute.innerText = 'Выкл';
    }
    else{
        video.muted = true;
        btnMute.innerText = 'Вкл';
    }
}

function next(){
    if(count!=playlist.length-1){
        count++;
    }
    else{
        count=0;
    }
    video.src = `videos/${playlist[count]}.mp4`
    videoTitle.innerText=title[count];
    videoText.innerText=text[count];
}

function last(){
    if(count!=0){
        count--;}
        else{
            count=playlist.length-1;
        }
    video.src = `videos/${playlist[count]}.mp4`;
    videoTitle.innerText=title[count];
    videoText.innerText=text[count];
}
