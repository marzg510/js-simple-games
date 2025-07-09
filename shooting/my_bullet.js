import { Entity } from './entity.js';
import { EntityStatus } from './entity_status.js';

export class MyBullet extends Entity {
    constructor(cx, cy, speed) {
        super(cx, cy, 3, 30); // 弾の幅=3, 高さ=30
        this.speed = speed; // 弾の速度
        this.status = EntityStatus.ACTIVE; // 弾がアクティブかどうか
        this.isHit = false; // 弾が敵に当たったかどうか
    }

    update() {
        if (!this.isHit) {
            this.cy -= this.speed; // 弾を上方向に移動
        }
        if (this.cy + this.height / 2 < 0) {
            this.status = EntityStatus.INACTIVE; // 画面外に出たら非アクティブにする
        }
    }

    isCollidingWith(enemy) {
        if (this.isHit) return false; // ヒットした弾は当たり判定を行わない
        if (this.status !== EntityStatus.ACTIVE) return false; // 非アクティブな弾は当たり判定を行わない
        if (enemy.isHit) return false; // ヒットした敵は当たり判定を行わない

        return super.isCollidingWith(enemy);
    }
}