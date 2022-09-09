import './style.css';
import StartScreen from './start-screen.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import RectCircleColliding from './rect-circle-colliding.js';
import BrickField from './brick-field.js';
import ScoreTracker from './score-tracker.js';
import tickSound from './tick-sound.mp3';

const canvas = document.createElement('canvas');
canvas.width = '600';
canvas.height = '400';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const startScreen = new StartScreen(canvas, ctx, GAME);
startScreen.initialize();

function playAudio() {
    //const bounceSound = new Audio('./tick-sound.mp3');
    const bounceSound = new Audio(tickSound);
    bounceSound.play();
}

function GAME() {
    console.log('GAME func called')
    const scoreTracker = new ScoreTracker(canvas, ctx);
    const paddle = new Paddle(canvas, ctx);
    const ball = new Ball(canvas, ctx, paddle);
    const brickField = new BrickField(canvas, ctx, ball, RectCircleColliding, scoreTracker);

    let lastRenderTime;
    function gameLoop(timestamp) {
        // control the speed
        if(lastRenderTime === undefined) {
            lastRenderTime = timestamp;
        }
        const elapsed = timestamp - lastRenderTime;
        const id = requestAnimationFrame(gameLoop)
        if(elapsed < 16) {return}
        lastRenderTime = timestamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        scoreTracker.draw();

        paddle.draw();
        paddle.makeMovable();

        ball.draw();
        ball.move();
        if(scoreTracker.value === brickField.columnCount * brickField.rowCount) {
            cancelAnimationFrame(id);
            paddle.removeEventListeners();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            startScreen.initialize('YOU WON! RESTART');
        }
        brickField.draw();
        brickField.brickBallCollisionDetection(playAudio);

        if(ball.x + ball.dx <= 0 + ball.r || ball.x + ball.dx >= canvas.width - ball.r) {
            ball.toggleDx();
            playAudio();
        }
        if(ball.y + ball.dy <= 0 + ball.r /*|| ball.y >= canvas.height - ball.r - 2*/) {
            ball.toggleDy();
            playAudio();
        } else if(RectCircleColliding(ball, paddle)) {
            ball.toggleDy();
            //let bounceSound = new Audio('./tick-sound.mp3');
            //bounceSound.play();
            playAudio();
        } else if(ball.y >= canvas.height - ball.r) {
            cancelAnimationFrame(id);
            paddle.removeEventListeners();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            startScreen.initialize('GAME OVER! RESTART');
        }
    }
    requestAnimationFrame(gameLoop)
}
