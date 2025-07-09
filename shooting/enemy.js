import { Entity } from "./entity.js";
import { EnemyStatus } from "./enemy_status.js";
import { Explosion } from "./explosion.js";

export class Enemy extends Entity {
    constructor(cx, cy, width, height) {
        super(cx, cy, width, height);
        this.status = EnemyStatus.ACTIVE; // 敵の状態
    }

    update(deltaTime) {
        switch (this.status) {
            case EnemyStatus.ACTIVE:
                this.cy += 1; // 下に移動
                break;
            case EnemyStatus.EXPLODING:
                this.explosion.update(deltaTime);
                if ( this.explosion.isFinished() ) {
                    this.remove();
                }
                break;
            default:
                // 何もしない
                break;
        }
    }
    explode() {
        if ( this.status === EnemyStatus.ACTIVE) {
            this.status = EnemyStatus.EXPLODING; // 爆発中に変更
            this.explosion = new Explosion(this.cx, this.cy, this.width, this.height, 1000);
        }
    }
    remove() {
        this.status = EnemyStatus.REMOVED;
    }
}