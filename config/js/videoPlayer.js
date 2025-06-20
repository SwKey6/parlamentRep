const iframe = document.getElementById('f7'); // Идентификатор iframe
const btnPause = document.getElementById('f8');
const btnMute = document.getElementById('f9');
const videoTitle = document.getElementById('f10');
const videoText = document.getElementById('f11');
const playlist = ['UwjJp9KQlGQ', 'kgRdvXt41Kg']; // Пример ID видео на YouTube
const title = ['Мы Мытищи', '8 марта'];
const text = ['Пресс-центр', 'Пресс-центр'];
let count = 0;
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player(iframe, {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.mute();
    document.getElementById('f9').innerText = 'Вкл'; // Обновляем текст кнопки
}

function play() {
    const player = iframe.contentWindow;
    if (btnPause.innerText === 'Играть') {
        // Запускаем видео
        player.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        btnPause.innerText = 'Пауза';
    } else {
        // Приостанавливаем видео
        player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        btnPause.innerText = 'Играть';
    }
}

function mute() {
    const player = iframe.contentWindow;
    if (btnMute.innerText === 'Вкл') {
        // Включаем звук
        player.postMessage('{"event":"command","func":"unMute","args":""}', '*');
        btnMute.innerText = 'Выкл';
    } else {
        // Выключаем звук
        player.postMessage('{"event":"command","func":"mute","args":""}', '*');
        btnMute.innerText = 'Вкл';
    }
}

function next() {
    if (count != playlist.length - 1) {
        count++;
    } else {
        count = 0;
    }
    iframe.src = `https://www.youtube.com/embed/${playlist[count]}?autoplay=1&enablejsapi=1`;
    videoTitle.innerText = title[count];
    videoText.innerText = text[count];
}

function last() {
    if (count != 0) {
        count--;
    } else {
        count = playlist.length - 1;
    }
    iframe.src = `https://www.youtube.com/embed/${playlist[count]}?autoplay=1&enablejsapi=1`;
    videoTitle.innerText = title[count];
    videoText.innerText = text[count];
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
