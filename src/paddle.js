class Paddle {
    constructor( canvas, ctx ) {
        this.canvasRef = canvas;
        this.ctxRef = ctx;
        this.w = 100;
        this.h = 20;
        this.x = this.canvasRef.width / 2 - this.w / 2; // to center the paddle initially
        this.y = this.canvasRef.height - this.h - 20;  // 20 above from ground
        this.color = 'tomato';
        this.attachEventListeners();
        this.doMoveLeft = false;
        this.doMoveRight = false;
        //this.removeEventListeners();
    }
    keydownEventHandler(e) {
        if(e.keyCode === 37) { this.doMoveLeft = true }
        if(e.keyCode === 39) { this.doMoveRight = true }
    }
    keyupEventHandler(e) {
        if(e.keyCode === 37) { this.doMoveLeft = false }
        if(e.keyCode === 39) { this.doMoveRight = false }
    }
    attachEventListeners() {
        this.boundedKeydownEventHandler = this.keydownEventHandler.bind(this);
        this.boundedKeyupEventHandler = this.keyupEventHandler.bind(this);
        document.addEventListener('keydown', this.boundedKeydownEventHandler);
        document.addEventListener('keyup', this.boundedKeyupEventHandler);
    }
    removeEventListeners() {
        document.removeEventListener('keydown', this.boundedKeydownEventHandler);
        document.removeEventListener('keyup', this.boundedKeyupEventHandler)
    }
    draw() {
        this.ctxRef.fillStyle = this.color;
        this.ctxRef.fillRect(this.x, this.y, this.w, this.h);
    }
    moveLeft() {
        this.x -= 10;
    }
    moveRight() {
        this.x += 10;
    }
    makeMovable() {
        if(this.doMoveLeft) {
            this.moveLeft();
            if(this.x < 0) {
                this.x = 0;
            }
        }
        if(this.doMoveRight) {
            this.moveRight();
            if(this.x > this.canvasRef.width - this.w) {
                this.x = this.canvasRef.width - this.w;
            }
        }
    }
}

export default Paddle;
