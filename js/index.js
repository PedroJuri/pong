const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 18,
paddleHeight = 120,
paddleSpeed = 8,
ballRadius = 12,
initialBallSpeed = 8,
maxBallSpeed = 40,
netWidth = 5,
netColor = "WHITE";

// Desenhando fundos no canvas
function drawNet(){
    for (let i =0; i <= canvas.height; i+=15){
        drawRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10, netColor);
    }
}

// Desenhando jogadores no canvas

function drawRect(x, y, width, height, color){
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

//Desenhando a bolinha no canvas
function drawCircle(x, y, radius, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
}

// Desenhando o texto no canvas
function drawText(text, x, y, color, fontSize = 60, fontWeight = 'bold', font = "Courier New"){
    context.fillStyle = color;
    context.font = `${fontSize}px ${font}`;
    context.textAlign = "center";
    context.fillText(text, x, y);
}

// Criando o rebote do joggador
function createPaddle(x, y, width, height, color){
    return{x, y, width, height, color, score:0};
}

// Criando o objeto da bola
function createBall(x, y, radius, velocityX, velocityY, color){
    return{x, y, radius, velocityX, velocityY, color, speed: initialBallSpeed};
}

// Definindo a prancha de cada usuário (usuário e máquina)
const user = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "WHITE");
const com = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "WHITE");

// Definindo o objeto bola
const ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, initialBallSpeed, initialBallSpeed, "WHITE");

// Atualizando prancha conforme o mouse do usuário
canvas.addEventListener('mousemove', movePaddle);

function movePaddle(event){
    const rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
}

