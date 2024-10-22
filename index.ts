interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

interface Mouse {
  x: number;
  y: number;
}

// Get canvas element and context
const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Initialize variables
let stars: Star[] = []; // Array that contains the stars
const FPS: number = 60; // Frames per second
const starCount: number = 100; // Number of stars
const mouse = { x: 0, y: 0 }; // Mouse location

// Push stars to array
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25,
  });
}

// Draw the scene
function draw(): void {
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  context.globalCompositeOperation = "lighter"; // Composite operation to draw brighter stars

  for (let star of stars) {
    context.fillStyle = "#fff";
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    context.fill();
    context.fillStyle = 'black';
    context.stroke();
  }

  context.beginPath();
  for (let starI of stars) {
    context.moveTo(starI.x, starI.y);
    if (distance(mouse, starI) < 150) context.lineTo(mouse.x, mouse.y);
    for (let starII of stars) {
      if (distance(starI, starII) < 150) {
        context.lineTo(starII.x, starII.y);
      }
    }
  }
  context.lineWidth = 0.05;
  context.strokeStyle = 'white';
  context.stroke();
}

// Calculate the distance between two points
function distance(point1: { x: number; y: number }, point2: { x: number; y: number }): number {
    const xs = point2.x - point1.x;
    const ys = point2.y - point1.y;
    return Math.sqrt(xs * xs + ys * ys);
}

// Update star locations
function update(): void {
    for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
}

// Track mouse movement
canvas.addEventListener('mousemove', (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Update and draw the scene
function tick(): void {
    draw();
    update();
    requestAnimationFrame(tick);
}

// Start the animation
tick();