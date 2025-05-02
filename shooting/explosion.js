export class Explosion {
    constructor(x, y, width, height, duration) {
        this.x = x; // 爆発のx座標
        this.y = y; // 爆発のy座標
        this.width = width; // 爆発の幅
        this.height = height; // 爆発の高さ
        this.duration = duration; // アニメーションの合計時間（ミリ秒）
        this.elapsedTime = 0; // 経過時間
    }

    update(deltaTime) {
        this.elapsedTime += deltaTime;
    }

    isFinished() {
        return this.elapsedTime >= this.duration;
    }
}