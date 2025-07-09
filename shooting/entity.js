import { EntityStatus } from './entity_status.js';
import { Explosion } from './explosion.js';

/**
 * 全エンティティの基底クラス
 */
export class Entity {
    constructor(cx, cy, width, height) {
        this.cx = cx;
        this.cy = cy;
        this.width = width;
        this.height = height;
        this.status = null;
        this.explosion = null;
    }

    /**
     * 他のエンティティとの衝突判定
     * @param {Entity} other - 衝突判定対象のエンティティ
     * @returns {boolean} 衝突している場合はtrue
     */
    isCollidingWith(other) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const otherHalfWidth = other.width / 2;
        const otherHalfHeight = other.height / 2;

        if (this.cx + halfWidth <= other.cx - otherHalfWidth) return false;
        if (this.cx - halfWidth >= other.cx + otherHalfWidth) return false;
        if (this.cy + halfHeight <= other.cy - otherHalfHeight) return false;
        if (this.cy - halfHeight >= other.cy + otherHalfHeight) return false;
        
        return true;
    }

    /**
     * エンティティの境界を取得
     * @returns {Object} 境界情報（left, right, top, bottom）
     */
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

    /**
     * エンティティを爆発状態にする
     * @param {number} explosionDuration - 爆発の持続時間（ミリ秒）
     */
    explode(explosionDuration = 1000) {
        if (this.status === EntityStatus.ACTIVE) {
            this.status = EntityStatus.EXPLODING;
            this.explosion = new Explosion(
                this.cx,
                this.cy,
                this.width,
                this.height,
                explosionDuration
            );
        }
    }

    /**
     * エンティティを削除状態にする
     */
    remove() {
        if (this.status === EntityStatus.EXPLODING) {
            this.status = EntityStatus.REMOVED;
        }
    }

    /**
     * 爆発状態の処理
     * @param {number} deltaTime - 前フレームからの経過時間
     */
    handleExplodingState(deltaTime) {
        if (this.explosion) {
            this.explosion.update(deltaTime);
            if (this.explosion.isFinished()) {
                this.remove();
            }
        }
    }

    /**
     * エンティティの更新処理（サブクラスで実装）
     * @param {number} _deltaTime - 前フレームからの経過時間
     */
    update(_deltaTime) {
        throw new Error("update method must be implemented by subclass");
    }
}