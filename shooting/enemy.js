export class Enemy {
    constructor(x, y, width, height) {
        this.x = x; // 敵のx座標
        this.y = y; // 敵のy座標
        this.width = width; // 敵の幅
        this.height = height; // 敵の高さ
    }

    update() {
        this.y += 1; // 下に移動
    }
}