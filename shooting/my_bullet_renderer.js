import { EntityRenderer } from "./entity_renderer.js";

export class MyBulletRenderer extends EntityRenderer {
    constructor(ctx) {
        // MyBulletは画像を使用しないため、ダミーの値を渡す
        super(ctx, null, 0, 0, null);
    }

    /**
     * 弾の矩形を描画する
     * @param {Object} bullet - 描画する弾
     */
    drawBulletRect(bullet) {
        this.ctx.fillStyle = "orange"; // 弾の色
        this.ctx.fillRect(
            bullet.cx - bullet.width / 2, bullet.cy - bullet.height / 2,
            bullet.width, bullet.height
        ); // 弾を描画
    }

    render(bullet) {
        // 非アクティブな弾は描画しない
        if (!bullet.isActive) {
            return;
        }
        // ヒットした弾は描画しない
        if (bullet.isHit) {
            return;
        }

        // 弾の矩形を描画
        this.drawBulletRect(bullet);
        
        // コリジョンエリアを描画
        this.drawCollisionArea(bullet);
    }
}