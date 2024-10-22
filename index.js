// Get canvas element and context
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Initialize variables
var stars = []; // Array that contains the stars
var FPS = 60; // Frames per second
var starCount = 100; // Number of stars
var mouse = { x: 0, y: 0 }; // Mouse location
// Push stars to array
for (var i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
    });
}
// Draw the scene
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    context.globalCompositeOperation = "lighter"; // Composite operation to draw brighter stars
    for (var _i = 0, stars_1 = stars; _i < stars_1.length; _i++) {
        var star = stars_1[_i];
        context.fillStyle = "#fff";
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = 'black';
        context.stroke();
    }
    context.beginPath();
    for (var _a = 0, stars_2 = stars; _a < stars_2.length; _a++) {
        var starI = stars_2[_a];
        context.moveTo(starI.x, starI.y);
        if (distance(mouse, starI) < 150)
            context.lineTo(mouse.x, mouse.y);
        for (var _b = 0, stars_3 = stars; _b < stars_3.length; _b++) {
            var starII = stars_3[_b];
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
function distance(point1, point2) {
    var xs = point2.x - point1.x;
    var ys = point2.y - point1.y;
    return Math.sqrt(xs * xs + ys * ys);
}
// Update star locations
function update() {
    for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx / FPS;
        s.y += s.vy / FPS;
        if (s.x < 0 || s.x > canvas.width)
            s.vx = -s.vx;
        if (s.y < 0 || s.y > canvas.height)
            s.vy = -s.vy;
    }
}
// Track mouse movement
canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
// Update and draw the scene
function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}
// Start the animation
tick();
