<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chroma Key</title>
  <style>
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    canvas {
      background-image: url(pokemon.jpg);
      background-size: cover;
      background-position: center;
    }
  </style>
</head>
<body>
  <video width="0" height="0" src="" id="video" autoplay></video>
  <canvas id="canvas" width="0" height="0"></canvas>
  <script>
    const video = document.querySelector('#video')
    const canvas = document.querySelector('#canvas')
    const ctx = canvas.getContext('2d')

    navigator.mediaDevices.getUserMedia({
      video: true,
    })
    .then((stream) => {
      video.srcObject = stream
    })

    video.addEventListener('loadeddata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      setInterval(() => {
        chromaKey()
      }, 40)
    })

    function chromaKey() {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const dataLength = imageData.data.length / 4
      for (let i = 0; i < dataLength; i++) {
        const offset = i * 4
        const red = imageData.data[offset + 0]
        const green = imageData.data[offset + 1]
        const blue = imageData.data[offset + 2]

        if (blue > 90 && blue > red && blue > green) {
          imageData.data[offset + 3] = 0
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }
  </script>
</body>
</html>