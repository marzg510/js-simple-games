window.Renderer = class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(state) {
        const { ball, wallWidth, racket, score, hiScore } = state;

        // キャンバスをクリア
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // 壁を描画
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, wallWidth); // 上の壁
        this.ctx.fillRect(0, 0, wallWidth, this.ctx.canvas.height); // 左の壁
        this.ctx.fillRect(this.ctx.canvas.width - wallWidth, 0, wallWidth, this.ctx.canvas.height); // 右の壁

        // ラケットを描画
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(racket.x, racket.y, racket.width, racket.height);

        // ボールを描画
        this.ctx.beginPath();
        this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = "orange";
        this.ctx.fill();
        this.ctx.stroke();

        // スコアを描画
        this.ctx.fillStyle = "black";
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Score: ${score}`, this.ctx.canvas.width / 2, 30);

        // ハイスコアを描画
        this.ctx.font = "18px Arial";
        this.ctx.fillText(`Hi Score: ${hiScore}`, this.ctx.canvas.width / 2, 60);
    }

    renderTitleScreen() {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = "red";
        this.ctx.font = "48px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("M510 Tennis", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 50);

        this.ctx.font = "24px Arial";
        this.ctx.fillText("HIT ANY KEY TO START", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 20);
    }

    renderGameOver(isNewHiScore) {
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "red";
        this.ctx.fillText("GAME OVER", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 50);

        if (isNewHiScore) {
            this.ctx.fillStyle = "green";
            this.ctx.font = "30px Arial";
            this.ctx.fillText("NEW HI SCORE!", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 20);
        }
    }
}