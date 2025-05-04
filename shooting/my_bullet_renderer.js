export class MyBulletRenderer {
    constructor(ctx) {
        this.ctx = ctx; // 描画用のコンテキスト
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

        this.ctx.fillStyle = "orange"; // 弾の色
        this.ctx.fillRect(
            bullet.cx - bullet.width / 2, bullet.cy - bullet.height /2,
            bullet.width, bullet.height
        ); // 弾を描画
        // コリジョンエリアを描画
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(
            bullet.cx - bullet.width / 2, bullet.cy - bullet.height /2,
            bullet.width, bullet.height
        );
    }
}