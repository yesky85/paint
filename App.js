const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('colors');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = 'black';
ctx.lineWidth = 2.5;
ctx.fillSytle = 'white';

let painting = false;
let filling = false;

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

function handleColorClick(event) {
  const colorClick = event.target.style.backgroundColor;
  ctx.strokeStyle = colorClick;
  ctx.fillStyle = colorClick;
}

function handleRangeInput(event) {
  const rangeInput = event.target.value;
  ctx.lineWidth = rangeInput;
}

function handleModeClick(event) {
  const modeClick = event.target.innerText;
  if (modeClick === 'FILL') {
    mode.innerText = 'PAINT';
    filling = true;
  } else {
    mode.innerText = 'FILL';
    filling = false;
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick),
);

if (range) {
  range.addEventListener('input', handleRangeInput);
}
if (mode) {
  mode.addEventListener('click', handleModeClick);
}
