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

