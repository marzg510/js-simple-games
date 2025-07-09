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
     * エンティティの更新処理（サブクラスで実装）
     * @param {number} deltaTime - 前フレームからの経過時間
     */
    update(deltaTime) {
        throw new Error("update method must be implemented by subclass");
    }
}