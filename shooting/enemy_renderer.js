import { EnemyStatus } from "./enemy_status.js";
import { ExplosionRenderer } from "./explosion_renderer.js";

export class EnemyRenderer {
    constructor(ctx, enemyImageSrc, width, height, explosionImageSrc) {
        this.ctx = ctx;
        this.enemyImage = new Image();
        this.enemyImage.src = enemyImageSrc;
        this.width = width;
        this.height = height; // 爆発の高さ
        this.explosionRenderer = new ExplosionRenderer(ctx, explosionImageSrc, width, height, 5, 100); // 爆発エフェクトのレンダラーを初期化　TODO::後で移動
    }

    render(enemy) {
        switch (enemy.status) {
            case EnemyStatus.ACTIVE:
                this.ctx.drawImage(
                    this.enemyImage,
                    enemy.x,
                    enemy.y,
                    this.width,
                    this.height
                );
                this.ctx.strokeStyle = "red";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
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