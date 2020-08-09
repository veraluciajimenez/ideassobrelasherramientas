// Define globals
const overlay = document.getElementById("overlay");
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = overlay.offsetHeight;
const context = canvas.getContext("2d");
let id = "";

// Draw with the mouse
document.addEventListener("mousemove", draw(), false);

// Draw with finger
document.addEventListener("touchmove", drawTouch(), false);

// Clear the drawing when double clicked
document.addEventListener("click", clear, false);

// Set the image
function setImage(e) {
  const src = e.target.getAttribute("id") || "";

  if (src.includes("image-")) {
    id = src;
  }
}

// Draw with the mouse
function draw() {
  return function (e) {
    setImage(e);

    if (id.includes("image-")) {
      const pos = getMousePosition(e, canvas);

      context.drawImage(document.getElementById(id), pos.x, pos.y, 300, 400);
    }
  };
}

// Draw on touch devices
function drawTouch() {
  return function (e) {
    setImage(e);

    const touch = e.touches[0];

    if (id.includes("image-")) {
      const pos = getMousePosition(touch, canvas);

      context.drawImage(document.getElementById(id), pos.x, pos.y, 300, 400);
    }
  };
}

// Calculate mouse position inside canvas
// Required to get the correct mouse coordinates
function getMousePosition(e, canvas) {
  const rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return {
    x: (e.clientX - rect.left - 150) * scaleX, // scale mouse coordinates after they have
    y: (e.clientY - rect.top - 200) * scaleY, // been adjusted to be relative to element
  };
}

// Clear the drawing
function clear() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  id = "";
}
