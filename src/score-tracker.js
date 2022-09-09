class ScoreTracker {
    constructor(canvas, ctx) {
        this.canvasRef = canvas;
        this.ctxRef = ctx;
        this.color = 'red';
        this.value = 0;
    }
    draw() {
        this.ctxRef.font = '16px serif';
        this.ctxRef.fillStyle = this.color;
        this.ctxRef.textAlign = 'left'
        this.ctxRef.textBaseline = 'top'
        this.ctxRef.fillText(`Score: ${this.value}`, 10, 10)
    }
}

export default ScoreTracker;
