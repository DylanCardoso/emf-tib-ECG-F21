const canvas = document.getElementById("roseCanvas");
const ctx = canvas.getContext("2d");

const spriteData = {
  frames: {
    "Rose 0.ase": { frame: { x: 0, y: 0, w: 40, h: 73 }, duration: 100 },
    "Rose 1.ase": { frame: { x: 40, y: 0, w: 40, h: 73 }, duration: 100 },
    "Rose 2.ase": { frame: { x: 80, y: 0, w: 40, h: 73 }, duration: 100 },
    "Rose 3.ase": { frame: { x: 0, y: 73, w: 40, h: 73 }, duration: 100 },
    "Rose 4.ase": { frame: { x: 40, y: 73, w: 40, h: 73 }, duration: 100 },
    "Rose 5.ase": { frame: { x: 80, y: 73, w: 40, h: 73 }, duration: 100 }
  },
  meta: {
    image: "RoseSprite.png",
    size: { w: 128, h: 146 }
  }
};

const spriteImage = new Image();
spriteImage.src = spriteData.meta.image;

const frames = Object.values(spriteData.frames);

let isImageLoaded = false;

// Affiche la 1ère frame dès que l'image est chargée
spriteImage.onload = () => {
  isImageLoaded = true;
  canvas.width = frames[0].frame.w;
  canvas.height = frames[0].frame.h;

  const f = frames[0].frame;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(spriteImage, f.x, f.y, f.w, f.h, 0, 0, canvas.width, canvas.height);
};

function playAnimation(iterations = 1) {
  if (!isImageLoaded) {
    spriteImage.onload = () => {
      isImageLoaded = true;
      runAnimation(iterations);
    };
  } else {
    runAnimation(iterations);
  }
}

function runAnimation(iterations) {
  let currentIteration = 0;
  let currentFrameIndex = 0;
  let lastTimestamp = 0;

  canvas.width = frames[0].frame.w;
  canvas.height = frames[0].frame.h;

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const frame = frames[currentFrameIndex];
    const duration = frame.duration;

    if (timestamp - lastTimestamp >= duration) {
      lastTimestamp = timestamp;
      currentFrameIndex++;
      if (currentFrameIndex >= frames.length) {
        currentIteration++;
        if (currentIteration >= iterations) {
          return; // stop animation
        }
        currentFrameIndex = 0;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const f = frame.frame;
    ctx.drawImage(
      spriteImage,
      f.x, f.y, f.w, f.h,
      0, 0, canvas.width, canvas.height
    );

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
