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
    context.font = `${fontWeight} ${fontSize}px ${font}`;
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

// Colisão entre bola e prancha
function collision(b, p){
    return(
        b.x + b.radius > p.x && b.x - b.radius < p.x + p.width&& b.y + b.radius > p.y && b.y - b.radius < p.y + p.height
    );
}

// Resetar a posição da bola e velocidade
function resetBall(){
    ball.x = canvas.width / 2;
    ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius;
    ball.velocityX = -ball.velocityX;
    ball.speed = initialBallSpeed;
}

// Atualizando a lógica do game
function update(){
    // Chacando o resultado e resetar a bola se necessário
    if(ball.x - ball.radius < 0){
        com.score++;
        resetBall();
    }else if(ball.x + ball.radius > canvas.width){
        user.score++;
        resetBall()
    }

    //Atualizando a posição da bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    //Atualizando a prancha do computador baseada na posiçõa da bola
    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    //Paredes de cima e baixo
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }

    //Determinar qual prancha irá bater na bola e a colisão dentre as mesmas
    let player = ball.x + ball.radius < canvas.width / 2 ? user:com;
    if(collision(ball, player)){
        const collidePoint = ball.y - (player.y + player.height / 2);
        const collisionAngle = (Math.PI / 4) * (collidePoint / (player.height / 2));
        const direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(collisionAngle);
        ball.velocityY = ball.speed * Math.sin(collisionAngle);
        
        //Aumentar velocidade da bola até o limite total de velocidade
        ball.speed += 0.2;
        if(ball.speed > maxBallSpeed){
            ball.speed = maxBallSpeed;
        };
    }
}

// Renderizar o jogo no espaço do canvas
function render(){
    // Limpar canvas com uma tela preta
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();
    
    // Desenhando resultado
    drawText(user.score, canvas.width / 4, canvas.height / 2, "GRAY", 120, 'bold');
    drawText(com.score, (3 * canvas.width) / 4, canvas.height / 2, "GRAY", 120, 'bold');

    //Desenhando pranchas
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // Desenhando a bola
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Rodar o jogo com loop
function gameLoop(){
    update();
    render();
}

// Incluir o game para rodar à 60fps (frames por segundo)
const framePerSec = 60;
setInterval(gameLoop, 1000 / framePerSec);