const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('colors');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');
const rect = document.getElementById('jsShapeRect');

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = 'black';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let rectPainting = false;
let x = 0;
let y = 0;
let oldx = 0;
let oldy = 0;

function stopPainting() {
  painting = false;

  if (rectPainting) {
    ctx.fillRect(oldx, oldy, x - oldx, y - oldy);
  }
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
    oldx = offsetX;
    oldy = offsetY;
  } else {
    if (rectPainting) {
      x = offsetX;
      y = offsetY;
    } else {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
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
  if (filling === false) {
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

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'image';
  link.click();
}

function handleRectClick(event) {
  if (rectPainting) {
    rectPainting = false;
  } else {
    rectPainting = true;
  }
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleContextMenu);
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

if (save) {
  save.addEventListener('click', handleSaveClick);
}

if (rect) {
  rect.addEventListener('click', handleRectClick);
}
