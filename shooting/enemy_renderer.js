import { EntityRenderer } from "./entity_renderer.js";
import { EntityStatus } from "./entity_status.js";

export class EnemyRenderer extends EntityRenderer {
    constructor(ctx, enemyImageSrc, width, height, explosionImageSrc) {
        super(ctx, enemyImageSrc, width, height, explosionImageSrc);
    }

    render(enemy) {
        switch (enemy.status) {
            case EntityStatus.ACTIVE:
                // エンティティを描画
                this.drawImage(enemy);
                // コリジョンエリアを描画
                this.drawCollisionArea(enemy);
                break;
            case EntityStatus.EXPLODING:
                this.drawExplosion(enemy.explosion);
                break;
            default:
                // 何もしない
                break;
        }
    }
}