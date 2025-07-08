import { MyShipStatus } from "./my_ship_status.js";
import { Explosion } from "./explosion.js";

export class MyShip {
    constructor(cx, cy, width, height, speed = 2) {
        this.cx = cx; // 自機の中心のx座標
        this.cy = cy; // 自機の中心のy座標
        this.width = width; // 自機の幅
        this.height = height; // 自機の高さ
        this.speed = speed; // 自機の移動速度
        this.movingLeft = false; // 左に移動中かどうか
        this.movingRight = false; // 右に移動中かどうか
        this.movingUp = false; // 上に移動中かどうか
        this.movingDown = false; // 下に移動中かどうか
        this.status = MyShipStatus.ACTIVE; // 自機の状態
        this.explosion = null; // 爆発オブジェクト
    }

    getBounds() {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        return {
            left: this.cx - halfWidth,
            right: this.cx + halfWidth,
            top: this.cy - halfHeight,
            bottom: this.cy + halfHeight,
        };
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
        const { left, right, top, bottom } = this.getBounds();

        if (this.movingLeft && left > 0) {
            this.cx -= this.speed;
        }
        if (this.movingRight && right < canvasWidth) {
            this.cx += this.speed;
        }
        if (this.movingUp && top > 0) {
            this.cy -= this.speed;
        }
        if (this.movingDown && bottom < canvasHeight) {
            this.cy += this.speed;
        }
    }

    isCollidingWith(enemy) {
        // 当たり判定のロジック
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        if (this.cx + halfWidth <= enemy.cx - enemy.width / 2) return false;  // 自分の右端が敵の左端より左にある
        if (this.cx - halfWidth >= enemy.cx + enemy.width / 2) return false;  // 自分の左端が敵の右端より右にある
        if (this.cy + halfHeight <= enemy.cy - enemy.height / 2) return false; // 自分の下端が敵の上端より上にある
        if (this.cy - halfHeight >= enemy.cy + enemy.height / 2) return false; // 自分の上端が敵の下端より下にある
        return true;
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