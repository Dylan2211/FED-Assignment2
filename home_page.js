document.addEventListener('DOMContentLoaded', function() {
  /* -------------------------------
     Modal & Popup Logic for the Game
     ------------------------------- */
  // Function to reset game variables and restart the loops
  function resetGame() {
    // Reset game state variables
    gameOver = false;
    spawnRate = 2500;
    gameSpeed = 5;
    position = 0;
    velocity = 0;
    jumpCount = 0;
    lastTime = null;
    trex.style.bottom = "0px";
    gameOverText.style.display = "none";

    // Remove any existing obstacles
    const obstacles = gameContainer.querySelectorAll(".cactus");
    obstacles.forEach(obs => obs.remove());

    // Restart the update and spawn loops
    requestAnimationFrame(update);
    setTimeout(spawnSpears, spawnRate);
  }

  // Function to show the game modal (and reset the game)
  function showGameModal() {
    resetGame();
    document.getElementById("gameModal").style.display = "block";
  }

  // Attach the close event to the close button
  const closeModal = document.getElementById("closeModal");
  if (closeModal) {
    closeModal.addEventListener("click", function() {
      document.getElementById("gameModal").style.display = "none";
    });
  }

  // Automatically show the game modal every 90 seconds (90,000 ms)
  setInterval(showGameModal, 90000);

  /* -------------------------------
     T-Rex Game Code
     ------------------------------- */
  let spawnRate = 2500;         // Initial spawn interval (ms)
  let minSpawnRate = 500;       // Minimum interval between spawns (ms)
  let spawnDecreaseRate = 10;   // Decrease (ms) per spawn

  let gameSpeed = 5;            // Initial game speed (pixels per frame)
  let speedIncreaseRate = 0.0015; // Increase per frame
  let maxSpeed = 15;            // Maximum game speed

  // Get elements for the game (inside the modal)
  const trex = document.getElementById("trex");
  const gameContainer = document.getElementById("game");
  const gameOverText = document.getElementById("gameOver");

  // Physics & jump variables
  let position = 0;   // Vertical position (in pixels)
  let velocity = 0;   // Vertical velocity (pixels per second)
  let jumpCount = 0;
  const maxJumps = 2; // Allow a double jump

  // Jump and gravity settings
  const JUMP_VELOCITY = 780; // Jump velocity (pixels/second)
  const GRAVITY_UP = -2700;  // Gravity while ascending
  const GRAVITY_DOWN = -3200; // Gravity while descending

  let lastTime = null;
  let gameOver = false;

  // Update physics each frame
  function update(time) {
    if (lastTime === null) lastTime = time;
    const delta = (time - lastTime) / 1000; // seconds
    lastTime = time;

    if (position > 0 || velocity !== 0) {
      if (velocity > 0) {
        velocity += GRAVITY_UP * delta;
      } else {
        velocity += GRAVITY_DOWN * delta;
      }
      position += velocity * delta;

      if (position < 0) {
        position = 0;
        velocity = 0;
        jumpCount = 0;
      }
      trex.style.bottom = position + "px";
    }

    if (!gameOver) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);

  // Handle jump input
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !event.repeat && !gameOver) {
      if (position === 0) {
        velocity = JUMP_VELOCITY;
        jumpCount = 1;
      } else if (jumpCount < maxJumps) {
        velocity = JUMP_VELOCITY;
        jumpCount++;
      }
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.code === "Space" && velocity > 0) {
      velocity = JUMP_VELOCITY / 4;
    }
  });

  // Collision detection (with a smaller hitbox)
  function checkCollision(trex, cactus) {
    const trexRect = trex.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();
    const hitboxPadding = { top: 5, bottom: 10, left: 8, right: 8 };

    const trexHitbox = {
      top: trexRect.top + hitboxPadding.top,
      bottom: trexRect.bottom - hitboxPadding.bottom,
      left: trexRect.left + hitboxPadding.left,
      right: trexRect.right - hitboxPadding.right
    };

    return (
      trexHitbox.right > cactusRect.left &&
      trexHitbox.left < cactusRect.right &&
      trexHitbox.bottom > cactusRect.top &&
      trexHitbox.top < cactusRect.bottom
    );
  }

  // Create and animate a spear obstacle
  function createCactus() {
    if (gameOver) return;

    const cactus = document.createElement("div");
    cactus.classList.add("cactus");
    cactus.style.left = gameContainer.offsetWidth + "px";
    const randomHeight = Math.floor(Math.random() * 60) + 60;
    cactus.style.height = randomHeight + "px";

    gameContainer.appendChild(cactus);

    const cactusInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(cactusInterval);
        return;
      }
      let cactusLeft = parseInt(cactus.style.left, 10);
      if (cactusLeft < -20) {
        clearInterval(cactusInterval);
        if (cactus.parentNode) gameContainer.removeChild(cactus);
      } else {
        cactus.style.left = (cactusLeft - gameSpeed) + "px";
        if (checkCollision(trex, cactus)) {
          gameOver = true;
          gameOverText.style.display = "block";
        }
      }
    }, 20);
  }

  // Repeatedly spawn spears, reducing the interval over time
  function spawnSpears() {
    if (gameOver) return;
    createCactus();
    spawnRate = Math.max(minSpawnRate, spawnRate - spawnDecreaseRate);
    setTimeout(spawnSpears, spawnRate);
  }
  setTimeout(spawnSpears, spawnRate);

  // T-Rex sprite animation (8 frames)
  let frameIndex = 0;
  const totalFrames = 8;
  const frameWidth = 60;
  const frameInterval = 100;
  function animateTrex() {
    if (velocity === 0) {
      trex.style.backgroundPosition = "0px 0px";
      return;
    }
    frameIndex = (frameIndex + 1) % totalFrames;
    trex.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`;
  }
  const animationLoop = setInterval(() => {
    if (!gameOver) animateTrex();
  }, frameInterval);

  // Gradually increase game speed
  function gameLoop() {
    if (gameOver) return;
    if (gameSpeed < maxSpeed) gameSpeed += speedIncreaseRate;
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
});
