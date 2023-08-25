const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 18,
paddleHeight = 120,
paddleSpeed = 8,
ballRedius = 12,
initialBallSpeed = 8,
maxBallSpeed = 40,
netWidth = 5,
netColor = "WHITE";

// Desenhando jogadores no canvas
function drawNet(){
    for (let i =0; i <= canvas.height; i+=15){
        drawRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10, netColor);
    }
}
