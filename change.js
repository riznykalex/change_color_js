let startButton;
let canvas;
let context;
let video;
let videoBg;
let canPlay;
let applyEffect;

function init() {
    startButton = document.getElementById('StartButton');
    toggleButton = document.getElementById('ToggleButton');
    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');
    video = document.getElementById('SourceVideo');
    videoBg = document.getElementById('bgVid');

    video.muted = true;



    if (video.readyState >= 3) {
        readyToPlay();
    } else {
        video.addEventListener('canplay', readyToPlay);
    }

    startButton.addEventListener('click', function () {
        console.log(canPlay);
        if (!canPlay) return;


        video.style.width = '640px';
        video.loop = true;
        video.play();
        videoBg.loop = true;
        videoBg.play();

        drawFrame(video);
    });

    toggleButton.addEventListener('click', function () {
        applyEffect = !applyEffect;
    });
}

function readyToPlay() {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canPlay = true;
}

function drawFrame(video) {
    context.drawImage(video, 0, 0);

    if (applyEffect) {
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        invertColors(imageData.data);
        context.putImageData(imageData, 0, 0);
    }

    setTimeout(function () {
        drawFrame(video);
    }, 10);
}


function invertColors(data) {
    for (let i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2])/3
        //if (data[i] <= 120  && data[i + 1] > 150 && data[i + 2] < 120) {
        //if (data[i + 1] > 120 && data[i] + data[i + 2] < data[i + 1] +70 ) {
        if (data[i+1]  - avg > 36) {
            data[i + 3] = 0 ;
        }
    }
}

window.addEventListener('load', init);

