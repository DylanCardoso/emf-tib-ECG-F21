// === Sélection du canvas ===
const canvasDialogRose = document.getElementById("roseDialog");
const ctxDialog = canvasDialogRose.getContext("2d");
ctxDialog.imageSmoothingEnabled = false;

document.getElementById("dialogButton").style.visibility = "hidden"; 
// === Image ===
const spriteImageDialog = new Image();
spriteImageDialog.src = "./../Images/Rose/dialog/DialogueSprite.png";

let isImageLoadedDialog = false;
let currentAnimationFrameID = null; // Pour annuler une animation déjà en cours

const scale = 2;

function showDialogText() {
    drawTextOnCanvas("Bonjour, je suis Rose !");
}

function drawTextOnCanvas(text) {
    ctxDialog.font = "16px Arial";
    ctxDialog.fillStyle = "white";
    ctxDialog.strokeStyle = "black";
    ctxDialog.lineWidth = 2;

    const x = 10;   // position horizontale
    const y = 20;   // position verticale

    ctxDialog.fillText(text, x, y);
    ctxDialog.strokeText(text, x, y);
}

// === Frames ===
const spriteDataDialog = {
    frames: {
        "Sprite-0001 0.": { frame: { x: 0, y: 0, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 1.": { frame: { x: 62, y: 0, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 2.": { frame: { x: 0, y: 30, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 3.": { frame: { x: 62, y: 30, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 4.": { frame: { x: 0, y: 60, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 5.": { frame: { x: 62, y: 60, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 6.": { frame: { x: 0, y: 90, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 7.": { frame: { x: 0, y: 120, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 8.": { frame: { x: 0, y: 120, w: 62, h: 30 }, duration: 50 },
        "Sprite-0001 9.": { frame: { x: 62, y: 120, w: 62, h: 30 }, duration: 50 },
    }
};

const framesDialog = Object.values(spriteDataDialog.frames);

// === Image chargée ===
spriteImageDialog.onload = () => {
    isImageLoadedDialog = true;

    canvasDialogRose.width = framesDialog[0].frame.w * scale;
    canvasDialogRose.height = framesDialog[0].frame.h * scale;
    ctxDialog.imageSmoothingEnabled = false;
};

// === Fonction publique appelée par le bouton ===
function animateRoseDialog() {
    if (!isImageLoadedDialog) {
        spriteImageDialog.onload = animateRoseDialog;
        return;
    }

    // Annuler toute animation en cours
    if (currentAnimationFrameID !== null) {
        cancelAnimationFrame(currentAnimationFrameID);
    }

    runAnimationRoseDialog();
}

// === Animation une seule fois, arrêt sur la dernière frame ===
function runAnimationRoseDialog() {
    document.getElementById("dialogButton").style.visibility = "visible";
    let currentFrame = 0;
    let lastTimestamp = 0;

    function loop(timestamp) {

        if (!lastTimestamp) lastTimestamp = timestamp;

        const frameData = framesDialog[currentFrame];

        // Passer à la frame suivante
        if (timestamp - lastTimestamp >= frameData.duration) {
            lastTimestamp = timestamp;
            currentFrame++;

            // Si dernière frame atteinte → on la garde affichée et stop
            if (currentFrame >= framesDialog.length) {
                currentFrame = framesDialog.length - 1;
                drawFrame(currentFrame);
                return;
            }
        }

        drawFrame(currentFrame);

        currentAnimationFrameID = requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
}

// === Dessin d’une frame ===
function drawFrame(frameIndex) {
    const f = framesDialog[frameIndex].frame;
    ctx.imageSmoothingEnabled = false;

    ctxDialog.clearRect(0, 0, canvasDialogRose.width, canvasDialogRose.height);

    ctxDialog.drawImage(
        spriteImageDialog,
        f.x, f.y, f.w, f.h,
        0, 0, f.w * scale, f.h * scale
    );
}
