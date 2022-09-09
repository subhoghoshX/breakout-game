class StartScreen {
    constructor(canvas, ctx, GAME){
        this.canvasRef = canvas;
        this.ctxRef = ctx;
        this.GAMERef = GAME;
        this.btnW = 300;   // btn width
        this.btnH = 80;    // btn height
        this.btnX = (this.canvasRef.width / 2 - this.btnW / 2);     // center the button in canvas
        this.btnY = (this.canvasRef.height / 2 - this.btnH / 2);
        //this.attachEventListeners();
    }
    initialize(message) {
        this.attachEventListeners();
        this.draw(message);
    }
    getCursorPosition(e) {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;     // x position of cursor within the element
        const y = e.clientY - rect.top;    // y position of cursor within the element
        return { x: x, y: y };
    }
    clickHandler(e) {
        const { x, y } = this.getCursorPosition(e);
        if(x >= this.btnX && x <= (this.btnX + this.btnW) && y >= this.btnY && y <= (this.btnY + this.btnH)) {
            //requestAnimationFrame(this.gameLoopRef);
            this.GAMERef();
            this.removeEventListeners();
        }
    }
    mousemoveHandler(e) {
        const { x , y } = this.getCursorPosition(e);
        this.canvasRef.style.cursor = 'auto';
        if(x >= this.btnX && x <= (this.btnX + this.btnW) && y >= this.btnY && y <= (this.btnY + this.btnH)) {
            this.canvasRef.style.cursor = 'pointer';
        }
    }
    attachEventListeners() {
        this.boundedClickHandler = this.clickHandler.bind(this);
        this.boundedMousemoveHandler = this.mousemoveHandler.bind(this);
        this.canvasRef.addEventListener('click', this.boundedClickHandler);
        this.canvasRef.addEventListener('mousemove', this.boundedMousemoveHandler);
    }
    removeEventListeners() {
        this.canvasRef.removeEventListener('click', this.boundedClickHandler);
        this.canvasRef.removeEventListener('mousemove', this.boundedMousemoveHandler);
        this.canvasRef.style.cursor = 'auto';
    }
    draw(message = 'START THE GAME') {
        // button box
        this.ctxRef.fillStyle = '#9333EA';
        //this.ctxRef.fillRect(this.btnX, this.btnY, 200, 80);
        this.ctxRef.fillRect(this.btnX, this.btnY, this.btnW, this.btnH);
        // button text
        this.ctxRef.fillStyle = 'white';
        this.ctxRef.font = 'bold 24px serif';
        this.ctxRef.textAlign = 'center';
        this.ctxRef.textBaseline = 'middle'
        //this.ctxRef.fillText('START', this.canvasRef.width / 2, this.canvasRef.height / 2)
        this.ctxRef.fillText(message, this.canvasRef.width / 2, this.canvasRef.height / 2)
    }
}

export default StartScreen;
