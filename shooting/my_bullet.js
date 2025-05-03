export class MyBullet {
    constructor(x, y, speed) {
        this.x = x; // 弾のx座標
        this.y = y; // 弾のy座標
        this.width = 3; // 弾の幅
        this.height = 30; // 弾の高さ
        this.speed = speed; // 弾の速度
        this.isActive = true; // 弾がアクティブかどうか
        this.isHit = false; // 弾が敵に当たったかどうか
    }

    update() {
        if (!this.isHit) {
            this.y -= this.speed; // 弾を上方向に移動
        }
        if (this.y + this.height < 0) {
            this.isActive = false; // 画面外に出たら非アクティブにする
        }
    }

    isCollidingWith(enemy) {
        if (this.isHit) return false; // ヒットした弾は当たり判定を行わない
        if (!this.isActive) return false; // 非アクティブな弾は当たり判定を行わない
        if (enemy.isHit) return false; // ヒットした敵は当たり判定を行わない

        // 当たり判定のロジック
        return (
            this.x < enemy.cx + enemy.width / 2 &&
            this.x + this.width > enemy.cx - enemy.width / 2 &&
            this.y < enemy.cy + enemy.height / 2 &&
            this.y + this.height > enemy.cy - enemy.height / 2
        );
    }
}