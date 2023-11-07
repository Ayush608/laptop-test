const Canvas = require('canvas');
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const text = url.pathname.split('/').pop()

  const baseImageRequest = await fetch('https://example.com/base-image.png')
  const baseImage = await baseImageRequest.arrayBuffer()

  const modifiedImage = await addTextToImage(baseImage, text)

  return new Response(modifiedImage, {
    headers: { 'Content-Type': 'image/png' },
  })
}

async function addTextToImage(imageBuffer, text) {
  const image = await Canvas.loadImage(imageBuffer);
  const canvas = Canvas.createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');

  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  context.font = '50px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = 'white';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toBuffer();
}
