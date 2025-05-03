import { EnemyStatus } from "./enemy_status.js";
import { Explosion } from "./explosion.js";

export class Enemy {
    constructor(cx, cy, width, height) {
        this.cx = cx; // 敵の中心x座標
        this.cy = cy; // 敵の中心y座標
        this.width = width; // 敵の幅
        this.height = height; // 敵の高さ
        this.status = EnemyStatus.ACTIVE; // 敵の状態
        this.explosion = null; // 爆発オブジェクト
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