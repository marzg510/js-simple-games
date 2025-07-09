import { Entity } from "./entity.js";
import { EntityStatus } from "./entity_status.js";
import { MyShipStatus } from "./my_ship_status.js";
import { Explosion } from "./explosion.js";
import { ActionRange } from "./action_range.js";

export class MyShip extends Entity {
    constructor(cx, cy, width, height, speed = 2, actionRange) {
        super(cx, cy, width, height);
        this.speed = speed; // 自機の移動速度
        this.actionRange = actionRange; // 自機の移動範囲を定義するオブジェクト
        this.movingLeft = false; // 左に移動中かどうか
        this.movingRight = false; // 右に移動中かどうか
        this.movingUp = false; // 上に移動中かどうか
        this.movingDown = false; // 下に移動中かどうか
        this.status = MyShipStatus.ACTIVE; // 自機の状態
    }



    update(deltaTime) {
        if (this.status === MyShipStatus.ACTIVE) {
            this.handleActiveState();
        } else if (this.status === MyShipStatus.EXPLODING) {
            this.handleExplodingState(deltaTime);
        }
    }

    handleActiveState() {
        this.move();
    }

    handleExplodingState(deltaTime) {
        this.explosion.update(deltaTime);
        if (this.explosion.isFinished()) {
            this.remove();
        }
    }

    move() {
        const { left, right, top, bottom } = this.getBounds();

        if (this.movingLeft && left > this.actionRange.x) {
            this.cx -= this.speed;
        }
        if (this.movingRight && right < this.actionRange.x + this.actionRange.width) {
            this.cx += this.speed;
        }
        if (this.movingUp && top > this.actionRange.y) {
            this.cy -= this.speed;
        }
        if (this.movingDown && bottom < this.actionRange.y + this.actionRange.height) {
            this.cy += this.speed;
        }
    }

    isCollidingWith(enemy) {
        return super.isCollidingWith(enemy);
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