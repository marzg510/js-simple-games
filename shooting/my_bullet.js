export class MyBullet {
    constructor(cx, cy, speed) {
        this.cx = cx; // 弾のx座標
        this.cy = cy; // 弾のy座標
        this.width = 3; // 弾の幅
        this.height = 30; // 弾の高さ
        this.speed = speed; // 弾の速度
        this.isActive = true; // 弾がアクティブかどうか
        this.isHit = false; // 弾が敵に当たったかどうか
    }

    update() {
        if (!this.isHit) {
            this.cy -= this.speed; // 弾を上方向に移動
        }
        if (this.cy + this.height / 2 < 0) {
            this.isActive = false; // 画面外に出たら非アクティブにする
        }
    }

    isCollidingWith(enemy) {
        if (this.isHit) return false; // ヒットした弾は当たり判定を行わない
        if (!this.isActive) return false; // 非アクティブな弾は当たり判定を行わない
        if (enemy.isHit) return false; // ヒットした敵は当たり判定を行わない

        if ( this.cx + this.width / 2 <= enemy.cx - enemy.width / 2 ) return false;  // 自分の右端が敵の左端より左にある
        if ( this.cx - this.width / 2 >= enemy.cx + enemy.width / 2 ) return false;  // 自分の左端が敵の右端より右にある
        if ( this.cy + this.height / 2 <= enemy.cy - enemy.height / 2 ) return false; // 自分の下端が敵の上端より上にある
        if ( this.cy - this.height / 2 >= enemy.cy + enemy.height / 2 ) return false; // 自分の上端が敵の下端より下にある
        return true;
    }
}