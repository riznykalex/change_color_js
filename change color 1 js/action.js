let effectButton;
let paintButton;
let canvas;
let context;

function init() {
    effectButton = document.getElementById('EffectButton');
    imgButton = document.getElementById('useImg');
    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');

    let image = document.getElementById('SourceImage');

    canvas.width = image.width;
    canvas.height = image.height;

    imgButton.addEventListener('click', function () {
        drawImage(image);
        });
    effectButton.addEventListener('click', onClick);
}

function drawImage(image) {
    context.drawImage(image, 0, 0);
}

function onClick() {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    changeColors(imageData.data);
    context.putImageData(imageData, 0, 0);
}

function changeColors(data) {
    for (let i = 0; i < data.length; i+= 4) {
        if (data[i] === data[i+1] && data[i] === data[i+2]){
            console.log(data[i]);
            data[i] = 255;
            data[i+1] = data[i+1];
            data[i+2] = 255;
        }else {
            data[i] = Math.floor( (data[i] + data[i+1] + data[i+2]) / 3);
            data[i+1] = 255;
            data[i+2] = 0;
        }
    }
}


window.addEventListener('load', init);