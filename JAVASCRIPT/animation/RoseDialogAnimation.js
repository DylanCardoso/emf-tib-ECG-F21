// Sélection du canvas et du contexte pour l'animation des dialogues de Rose
const canvasDialogRose = document.getElementById("roseDialogCanvas");
const ctxDialog = canvasDialogRose.getContext("2d");
ctxDialog.imageSmoothingEnabled = false;

// Chargement de l'image du sprite
const spriteImageDialog = new Image();
spriteImageDialog.src = "./../Images/Rose/dialog/DialogueSprite.png";  // Assurez-vous que le chemin est correct

// Récupération du JSON pour les frames de l'animation
const spriteDataDialog = {
  "frames": {
    "Sprite-0001 0.": {
      "frame": { "x": 0, "y": 0, "w": 62, "h": 30 },
      "duration": 50
    },
    "Sprite-0001 1.": {
      "frame": { "x": 62, "y": 0, "w": 62, "h": 30 },
      "duration": 50
    },
    "Sprite-0001 2.": {
      "frame": { "x": 0, "y": 30, "w": 62, "h": 30 },
      "duration": 50
    },
    "Sprite-0001 3.": {
      "frame": { "x": 62, "y": 30, "w": 62, "h": 30 },
      "duration": 50
    },
    // Ajoute les autres frames ici...
  },
  "meta": {
    "image": "RoseSprite.png",
    "size": { "w": 124, "h": 150 }
  }
};

// Récupérer les frames du JSON
const framesDialog = Object.values(spriteDataDialog.frames);
let isImageLoadedDialog = false;

// Lorsque l'image est chargée, initialiser le canvas
spriteImageDialog.onload = () => {
  isImageLoadedDialog = true;
  canvasDialogRose.width = framesDialog[0].frame.w;
  canvasDialogRose.height = framesDialog[0].frame.h;

  // Commencer l'animation après le chargement de l'image
  animateRoseDialog(1);
};

// Fonction pour démarrer l'animation
function animateRoseDialog(iterations = 1) {
  if (!isImageLoadedDialog) {
    spriteImageDialog.onload = () => {
      isImageLoadedDialog = true;
      runAnimationRoseDialog(iterations);
    };
  } else {
    runAnimationRoseDialog(iterations);
  }
}

// Fonction pour animer les frames du dialogue
function runAnimationRoseDialog(iterations) {
  let currentIteration = 0;
  let currentFrameIndexDialog = 0;
  let lastTimestampDialog = 0;

  canvasDialogRose.width = framesDialog[0].frame.w;
  canvasDialogRose.height = framesDialog[0].frame.h;

  function animateRoseDialog(timestamp) {
    if (currentIteration >= iterations) {
      // Arrêter l'animation une fois les itérations terminées
      currentFrameIndexDialog = 0; // Retourner à la première image
      ctxDialog.clearRect(0, 0, canvasDialogRose.width, canvasDialogRose.height);
      const fDialog = framesDialog[0].frame;
      ctxDialog.drawImage(spriteImageDialog, fDialog.x, fDialog.y, fDialog.w, fDialog.h, 0, 0, canvasDialogRose.width, canvasDialogRose.height);
      return; // Stopper l'animation
    }

    if (!lastTimestampDialog) lastTimestampDialog = timestamp;
    const frameDialog = framesDialog[currentFrameIndexDialog];
    const durationDialog = frameDialog.duration;

    if (timestamp - lastTimestampDialog >= durationDialog) {
      lastTimestampDialog = timestamp;
      currentFrameIndexDialog++;

      if (currentFrameIndexDialog >= framesDialog.length) {
        currentIteration++;
        if (currentIteration >= iterations) {
          currentFrameIndexDialog = 0;
        } else {
          currentFrameIndexDialog = 0;
        }
      }
    }

    ctxDialog.clearRect(0, 0, canvasDialogRose.width, canvasDialogRose.height);

    const fDialog = framesDialog[currentFrameIndexDialog].frame;
    ctxDialog.drawImage(spriteImageDialog, fDialog.x, fDialog.y, fDialog.w, fDialog.h, 0, 0, canvasDialogRose.width, canvasDialogRose.height);

    requestAnimationFrame(animateRoseDialog);
  }

  requestAnimationFrame(animateRoseDialog);
}
