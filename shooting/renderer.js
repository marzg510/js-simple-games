import { EnemyRenderer } from "./enemy_renderer.js";
import { MyBulletRenderer } from "./my_bullet_renderer.js";
import { MyShipRenderer } from "./my_ship_renderer.js";

export class Renderer {
    constructor(ctx, myShipImageSrc, enemyImageSrc, explosionImageSrc) {
        this.ctx = ctx;
        this.myBulletRenderer = new MyBulletRenderer(ctx);
        this.myShipImageSrc = myShipImageSrc;
        this.myShipRenderer = new MyShipRenderer(ctx, myShipImageSrc, 80, 80, explosionImageSrc);
        this.enemyRenderer = new EnemyRenderer(ctx, enemyImageSrc, 80, 80, explosionImageSrc);
    }

    render(state) {
        const { myShip, myBullets, enemies, score, hiScore } = state;

        // キャンバスをクリア
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // 敵を描画
        enemies.forEach((enemy) => this.enemyRenderer.render(enemy));

        // 自弾を描画
        myBullets.forEach((bullet) => this.myBulletRenderer.render(bullet));

        // 自機を描画
        this.myShipRenderer.render(myShip);

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
        this.ctx.fillText("M510 Shooting", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 50);

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