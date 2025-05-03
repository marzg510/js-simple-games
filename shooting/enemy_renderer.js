import { EnemyStatus } from "./enemy_status.js";
import { ExplosionRenderer } from "./explosion_renderer.js";

export class EnemyRenderer {
    constructor(ctx, enemyImageSrc, width, height, explosionImageSrc) {
        this.ctx = ctx;
        this.enemyImage = new Image();
        this.enemyImage.src = enemyImageSrc;
        this.width = width;
        this.height = height; // 爆発の高さ
        this.explosionRenderer = new ExplosionRenderer(ctx, explosionImageSrc, width, height, 5, 100);
    }

    render(enemy) {
        switch (enemy.status) {
            case EnemyStatus.ACTIVE:
                this.ctx.drawImage(
                    this.enemyImage,
                    enemy.cx - this.width / 2,
                    enemy.cy - this.height / 2,
                    this.width,
                    this.height
                );
                // コリジョンエリアを描画
                this.ctx.strokeStyle = "red";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(
                    enemy.cx - enemy.width / 2,
                    enemy.cy - enemy.height / 2,
                    enemy.width,
                    enemy.height
                );
                break;
            case EnemyStatus.EXPLODING:
                this.explosionRenderer.render(enemy.explosion)
                break;
            default:
                // 何もしない
                break;
        }
    }
}