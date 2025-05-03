import { MyShipStatus } from "./my_ship_status.js";
import { Explosion } from "./explosion.js";

export class MyShip {
    constructor(cx, cy, width, height, dx, dy) {
        this.cx = cx; // 自機の中心のx座標
        this.cy = cy; // 自機の中心のy座標
        this.width = width; // 自機の幅
        this.height = height; // 自機の高さ
        this.dx = dx; // 自機のx方向の速度
        this.dy = dy; // 自機のy方向の速度
        this.movingLeft = false; // 左に移動中かどうか
        this.movingRight = false; // 右に移動中かどうか
        this.movingUp = false; // 上に移動中かどうか
        this.movingDown = false; // 下に移動中かどうか
        this.status = MyShipStatus.ACTIVE; // 自機の状態
        this.explosion = null; // 爆発オブジェクト
    }

    update(canvasWidth, canvasHeight, deltaTime) {
        if (this.status === MyShipStatus.ACTIVE) {
            this.handleActiveState(canvasWidth, canvasHeight);
        } else if (this.status === MyShipStatus.EXPLODING) {
            this.handleExplodingState(deltaTime);
        }
    }

    handleActiveState(canvasWidth, canvasHeight) {
        this.move(canvasWidth, canvasHeight);
    }

    handleExplodingState(deltaTime) {
        this.explosion.update(deltaTime);
        if (this.explosion.isFinished()) {
            this.remove();
        }
    }

    move(canvasWidth, canvasHeight) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        if (this.movingLeft && this.cx - halfWidth > 0) {
            this.cx -= this.dx;
        }
        if (this.movingRight && this.cx + halfWidth < canvasWidth) {
            this.cx += this.dx;
        }
        if (this.movingUp && this.cy - halfHeight > 0) {
            this.cy -= this.dy;
        }
        if (this.movingDown && this.cy + halfHeight < canvasHeight) {
            this.cy += this.dy;
        }
    }

    isCollidingWith(enemy) {
        // 当たり判定のロジック
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        return (
            this.cx - halfWidth < enemy.x + enemy.width &&
            this.cx + halfWidth > enemy.x &&
            this.cy - halfHeight < enemy.y + enemy.height &&
            this.cy + halfHeight > enemy.y
        );
    }

    explode() {
        if (this.status === MyShipStatus.ACTIVE) {
            this.status = MyShipStatus.EXPLODING; // 爆発中に変更
            this.explosion = new Explosion(
                this.cx,
                this.cy,
                this.width,
                this.height,
                2000
            );
        }
    }

    remove() {
        if (this.status === MyShipStatus.EXPLODING) {
            this.status = MyShipStatus.REMOVED;
        }
    }
}