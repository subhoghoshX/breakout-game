class Ball {
    constructor(canvas, ctx, paddle) {
        this.canvasRef = canvas;
        this.ctxRef = ctx;
        this.paddleRef = paddle;
        this.r = 10;
        this.x = this.canvasRef.width / 2;
        this.y = this.paddleRef.y - this.r;
        this.color = 'green';
        this.dx = Math.floor(Math.random() * (3 - 2 + 1) ) + 3;
        this.dy = (Math.floor(Math.random() * (4 - 2 + 1) ) + 2) * -1;
    }
    draw() {
        this.ctxRef.beginPath();
        this.ctxRef.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctxRef.fillStyle = this.color;
        this.ctxRef.fill();
        this.ctxRef.closePath();
    }
    updateX() {
        this.x += this.dx;
    }
    updateY() {
        this.y += this.dy;
    }
    move() {
        this.updateX();
        this.updateY();
    }
    toggleDx() {
        this.dx = - this.dx;
    }
    toggleDy() {
        this.dy = - this.dy;
    }
}

export default Ball;
