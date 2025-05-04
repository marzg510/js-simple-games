export class Explosion {
    constructor(cx, cy, width, height, duration) {
        this.cx = cx; // 爆発の中心x座標
        this.cy = cy; // 爆発の中心y座標
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