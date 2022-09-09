class BrickField {
    constructor(canvas, ctx, ball, RectCircleColliding, scoreTracker) {
        this.canvasRef = canvas;
        this.ctxRef = ctx;
        this.ballRef = ball;
        this.RectCircleCollidingRef = RectCircleColliding;
        this.scoreTrackerRef = scoreTracker;
        this.columnCount = Math.floor(Math.random() * (10 - 6 + 1) ) + 6;
        this.rowCount = Math.floor(Math.random() * (5 - 4 + 1)) + 4;
        this.color = 'red';
        this.offsetTop = 30;
        this.offsetLeft = 30;
        this.spaceX = 10;
        this.spaceY = 10;
        this.w = ((canvas.width - 2 * this.offsetLeft - this.columnCount * this.spaceX) / this.columnCount)
        this.h = (canvas.height / 2 -  this.offsetTop - this.rowCount * this.spaceY) / this.rowCount;
        this.bricks = [];
        this.populateBricks();
    }
    populateBricks() {
        for(let c = 0; c < this.columnCount; c++) {
            this.bricks[c] = [];
            for(let r = 0; r < this.rowCount; r++) {
                this.bricks[c][r] = {
                    x: c * (this.w + this.spaceX) + this.offsetLeft,
                    y: r * (this.h + this.spaceY) + this.offsetTop,
                    show: true
                }
            }
        }
    }
    draw() {
        for(let c = 0; c < this.columnCount; c++) {
            for(let r = 0; r < this.rowCount; r++) {
                let b = this.bricks[c][r];
                if(b.show) {
                    this.ctxRef.fillStyle = this.color;
                    this.ctxRef.fillRect(b.x, b.y, this.w, this.h);
                }
            }
        }
    }
    brickBallCollisionDetection( playAudio ) {
        for(let c = 0; c < this.columnCount; c++) {
            for(let r = 0; r < this.rowCount; r++) {
                let b = this.bricks[c][r];
                if(this.RectCircleCollidingRef(this.ballRef, {x: b.x, y: b.y, w: this.w, h: this.h}) && b.show) {
                    playAudio()
                    b.show = false;
                    this.ballRef.toggleDy();
                    this.scoreTrackerRef.value++;
                }
            }
        }
    }
}

export default BrickField;
