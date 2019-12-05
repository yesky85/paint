const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = 'black';
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  } else {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
}

function onMouseUp(event) {
  stopPainting();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}
