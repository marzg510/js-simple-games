import { EntityRenderer } from "./entity_renderer.js";
import { EnemyStatus } from "./enemy_status.js";

export class EnemyRenderer extends EntityRenderer {
    constructor(ctx, enemyImageSrc, width, height, explosionImageSrc) {
        super(ctx, enemyImageSrc, width, height, explosionImageSrc);
    }

    render(enemy) {
        switch (enemy.status) {
            case EnemyStatus.ACTIVE:
                // エンティティを描画
                this.drawImage(enemy);
                // コリジョンエリアを描画
                this.drawCollisionArea(enemy);
                break;
            case EnemyStatus.EXPLODING:
                this.drawExplosion(enemy.explosion);
                break;
            default:
                // 何もしない
                break;
        }
    }
}