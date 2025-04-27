export class MyBullet {
    constructor(x, y, speed) {
        this.x = x; // 弾のx座標
        this.y = y; // 弾のy座標
        this.width = 3; // 弾の幅
        this.height = 30; // 弾の高さ
        this.speed = speed; // 弾の速度
        this.isActive = true; // 弾がアクティブかどうか
    }

    update() {
        this.y -= this.speed; // 弾を上方向に移動
        if (this.y + this.height < 0) {
            this.isActive = false; // 画面外に出たら非アクティブにする
        }
    }
}