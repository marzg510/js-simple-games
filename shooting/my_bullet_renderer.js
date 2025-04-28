export class MyBulletRenderer {
    constructor(ctx) {
        this.ctx = ctx; // 描画用のコンテキスト
    }

    render(bullet) {
        // 非アクティブな弾は描画しない
        if (!bullet.isActive) {
            return;
        }

        this.ctx.fillStyle = "orange"; // 弾の色
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height); // 弾を描画
        // ヒットエリアを描画
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}