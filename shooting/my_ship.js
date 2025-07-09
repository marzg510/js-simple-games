import { Entity } from "./entity.js";
import { EntityStatus } from "./entity_status.js";

export class MyShip extends Entity {
    constructor(cx, cy, width, height, speed = 2, actionRange) {
        super(cx, cy, width, height);
        this.speed = speed; // 自機の移動速度
        this.actionRange = actionRange; // 自機の移動範囲を定義するオブジェクト
        this.movingLeft = false; // 左に移動中かどうか
        this.movingRight = false; // 右に移動中かどうか
        this.movingUp = false; // 上に移動中かどうか
        this.movingDown = false; // 下に移動中かどうか
        this.status = EntityStatus.ACTIVE; // 自機の状態
    }



    update(deltaTime) {
        if (this.status === EntityStatus.ACTIVE) {
            this.handleActiveState();
        } else if (this.status === EntityStatus.EXPLODING) {
            super.handleExplodingState(deltaTime);
        }
    }

    handleActiveState() {
        this.move();
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
        super.explode(2000); // MyShipの爆発時間は2000ms
    }

    remove() {
        super.remove();
    }
}