import { EnemyRenderer } from "./enemy_renderer.js";
import { MyBulletRenderer } from "./my_bullet_renderer.js";

export class Renderer {
    constructor(ctx, enemyImageSrc) {
        this.ctx = ctx;
        this.enemyRenderer = new EnemyRenderer(ctx, enemyImageSrc, 80, 80);
        this.myBulletRenderer = new MyBulletRenderer(ctx);
    }

    render(state) {
        const { myShip, myBullets, enemies, score, hiScore } = state;

        // キャンバスをクリア
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // 自機を描画
        this.renderMyShip(myShip);

        // 自弾を描画
        this.renderMyBullets(myBullets);

        // 敵を描画
        this.renderEnemies(enemies);

        // スコアを描画
        this.ctx.fillStyle = "black";
        this.ctx.font = "24px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Score: ${score}`, this.ctx.canvas.width / 2, 30);

        // ハイスコアを描画
        this.ctx.font = "18px Arial";
        this.ctx.fillText(`Hi Score: ${hiScore}`, this.ctx.canvas.width / 2, 60);
    }

    renderMyShip(myShip) {
        this.ctx.beginPath();
        this.ctx.moveTo(myShip.x, myShip.y - myShip.height / 2); // 上の頂点
        this.ctx.lineTo(myShip.x - myShip.width / 2, myShip.y + myShip.height / 2); // 左下の頂点
        this.ctx.lineTo(myShip.x + myShip.width / 2, myShip.y + myShip.height / 2); // 右下の頂点
        this.ctx.closePath();
        this.ctx.fillStyle = "blue";
        this.ctx.fill();
    }

    renderMyBullets(bullets) {
        bullets.forEach((bullet) => this.myBulletRenderer.render(bullet));
    }

    renderEnemies(enemies) {
        enemies.forEach((enemy) => this.enemyRenderer.render(enemy));
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