export class MyShip {
    constructor(x, y, width, height, dx, dy) {
        this.x = x; // 自機のx座標
        this.y = y; // 自機のy座標
        this.width = width; // 自機の幅
        this.height = height; // 自機の高さ
        this.dx = dx; // 自機のx方向の速度
        this.dy = dy; // 自機のy方向の速度
        this.movingLeft = false; // 左に移動中かどうか
        this.movingRight = false; // 右に移動中かどうか
        this.movingUp = false; // 上に移動中かどうか
        this.movingDown = false; // 下に移動中かどうか
    }

    update(canvasWidth, canvasHeight) {
        if (this.movingLeft && this.x > 0) {
            this.x -= this.dx;
        }
        if (this.movingRight && this.x < canvasWidth) {
            this.x += this.dx;
        }
        if (this.movingUp && this.y > 0) {
            this.y -= this.dy;
        }
        if (this.movingDown && this.y < canvasHeight) {
            this.y += this.dy;
        }
    }
    isCollidingWith(enemy) {
        // 当たり判定のロジック
        return (
            this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y
        );
    }
}