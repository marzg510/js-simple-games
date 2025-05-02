import { EnemyStatus } from "./enemy_status.js";
import { Explosion } from "./explosion.js";

export class Enemy {
    constructor(x, y, width, height) {
        this.x = x; // 敵のx座標
        this.y = y; // 敵のy座標
        this.width = width; // 敵の幅
        this.height = height; // 敵の高さ
        this.status = EnemyStatus.ACTIVE; // 敵の状態
    }

    update(deltaTime) {
        switch (this.status) {
            case EnemyStatus.ACTIVE:
                this.y += 1; // 下に移動
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
            this.explosion = new Explosion(this.x, this.y, this.width, this.height, 1000);
        }
    }
    remove() {
        if ( this.status === EnemyStatus.EXPLODING ) {
            this.status = EnemyStatus.REMOVED;
        }
    }
}