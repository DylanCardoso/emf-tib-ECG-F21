const canvasDialogRose = document.getElementById("roseDialog");
const ctxDialog = canvasDialogRose.getContext("2d");
ctxDialog.imageSmoothingEnabled = false;

const spriteDataDialog = {
  frames: {
    "Sprite-0001 0.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 1.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 2.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 3.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 4.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 5.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 6.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 7.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 8.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
    "Sprite-0001 9.": { frameDialog: { x: 0, y: 0, w: 62, h: 30 }, durationDialog: 50 },
  },
  metaDialog: {
    imageDialog: "./../Images/Rose/dialog/DialogueSprite.png",
    size: { w: 124, h: 60 }
  }
};

const spriteImageDialog = new Image();
spriteImageDialog.src = spriteDataDialog.metaDialog.imageDialog;

const framesDialog = Object.values(spriteDataDialog.frames);
let animationStarted = false;
let isImageLoadedDialog = false;

spriteImageDialog.onload = () => {
  isImageLoaded = true;
  canvasDialogRose.width = framesDialog[0].frameDialog.w ;
  canvasDialogRose.height = framesDialog[0].frameDialog.h;

  const fDialog = framesDialog[0].frameDialog;
  ctxDialog.clearRect(0, 0, canvasDialogRose.width, canvasDialogRose.height);
  ctxDialog.drawImage(spriteImageDialog, fDialog.x, fDialog.y, fDialog.w, fDialog.h, 0, 0, canvasDialogRose.width, canvasDialogRose.height);
};

function animateRoseDialog() {
  if (animationStarted) return;
  animationStarted = true;

  let currentFrameIndexDialog = 0;
  let frameDurationDialog = framesDialog[currentFrameIndexDialog].durationDialog;
  const totalFramesDialog = framesDialog.length;

  const animationIntervalDialog = setInterval(() => {
    const fDialog = framesDialog[currentFrameIndexDialog].frameDialog;
    ctxDialog.clearRect(0, 0, canvasDialogRose.width, canvasDialogRose.height);
    ctxDialog.drawImage(spriteImageDialog, fDialog.x, fDialog.y, fDialog.w, fDialog.h, 0, 0, canvasDialogRose.width, canvasDialogRose.height);

    currentFrameIndexDialog++;

    if (currentFrameIndexDialog >= totalFramesDialog) {
      clearInterval(animationIntervalDialog);
    }
  }, frameDurationDialog);
}
