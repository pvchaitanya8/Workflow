const leftPaddle = document.getElementById('left-paddle');
const rightPaddle = document.getElementById('right-paddle');
const ball = document.getElementById('ball');
const gameContainer = document.querySelector('.game-container');
const startButton = document.getElementById('start-button');
const gameOverScreen = document.getElementById('game-over');
const leftPlayerScoreDisplay = document.getElementById('left-player-score');
const rightPlayerScoreDisplay = document.getElementById('right-player-score');

const paddleSpeed = 8;
const ballSpeedX = 5;
const ballSpeedY = 2;
const paddleHeight = 100;
const paddleWidth = 20;
const ballSize = 20;

let leftPaddleY = gameContainer.clientHeight / 2 - paddleHeight / 2;
let rightPaddleY = gameContainer.clientHeight / 2 - paddleHeight / 2;
let ballX = gameContainer.clientWidth / 2 - ballSize / 2;
let ballY = gameContainer.clientHeight / 2 - ballSize / 2;
let ballSpeedXDirection = 1;
let ballSpeedYDirection = 1;
let leftPlayerScore = 0;
let rightPlayerScore = 0;
let gameRunning = false;

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function startGame() {
    gameRunning = true;
    startButton.disabled = true;
    gameOverScreen.classList.add('hidden');
    leftPaddleY = gameContainer.clientHeight / 2 - paddleHeight / 2;
    rightPaddleY = gameContainer.clientHeight / 2 - paddleHeight / 2;
    ballX = gameContainer.clientWidth / 2 - ballSize / 2;
    ballY = gameContainer.clientHeight / 2 - ballSize / 2;
    ballSpeedXDirection = 1;
    ballSpeedYDirection = 1;
    leftPlayerScore = 0;
    rightPlayerScore = 0;
    leftPlayerScoreDisplay.textContent = leftPlayerScore;
    rightPlayerScoreDisplay.textContent = rightPlayerScore;
    gameOverScreen.querySelector('p').textContent = '';
    updateGame();
}

function endGame() {
    gameRunning = false;
    startButton.disabled = false;
    gameOverScreen.classList.remove('hidden');
    if (leftPlayerScore > rightPlayerScore) {
        gameOverScreen.querySelector('p').textContent = 'Player 1 Wins!';
    } else if (rightPlayerScore > leftPlayerScore) {
        gameOverScreen.querySelector('p').textContent = 'Player 2 Wins!';
    } else {
        gameOverScreen.querySelector('p').textContent = 'It\'s a Tie!';
    }
    leftPlayerScoreDisplay.textContent = leftPlayerScore;
    rightPlayerScoreDisplay.textContent = rightPlayerScore;
}

startButton.addEventListener('click', startGame);

function updateGame() {
    if (gameRunning) {
        ballX += ballSpeedX * ballSpeedXDirection;
        ballY += ballSpeedY * ballSpeedYDirection;

        if (ballY <= 0 || ballY >= gameContainer.clientHeight - ballSize) {
            ballSpeedYDirection *= -1;
        }

        if (
            ballX <= paddleWidth &&
            ballY + ballSize >= leftPaddleY &&
            ballY <= leftPaddleY + paddleHeight
        ) {
            if (ballSpeedXDirection === -1) {
                ballSpeedXDirection *= -1;
                leftPlayerScore++;
                leftPlayerScoreDisplay.textContent = leftPlayerScore;
            }
        }


        if (
            ballX + ballSize >= gameContainer.clientWidth - paddleWidth &&
            ballY + ballSize >= rightPaddleY &&
            ballY <= rightPaddleY + paddleHeight
        ) {
            if (ballSpeedXDirection === 1) {
                ballSpeedXDirection *= -1;
                rightPlayerScore++;
                rightPlayerScoreDisplay.textContent = rightPlayerScore;
            }
        }

        if (ballX <= 0 || ballX + ballSize >= gameContainer.clientWidth) {
            endGame();
            return;
        }

        if (keys['ArrowUp'] && rightPaddleY > 0) {
            rightPaddleY -= paddleSpeed;
        } else if (
            keys['ArrowDown'] &&
            rightPaddleY + paddleHeight < gameContainer.clientHeight
        ) {
            rightPaddleY += paddleSpeed;
        }

        if (keys['w'] && leftPaddleY > 0) {
            leftPaddleY -= paddleSpeed;
        } else if (keys['s'] && leftPaddleY + paddleHeight < gameContainer.clientHeight) {
            leftPaddleY += paddleSpeed;
        }

        leftPaddle.style.top = leftPaddleY + 'px';
        rightPaddle.style.top = rightPaddleY + 'px';
        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(updateGame);
    }
}

updateGame();

