import { ExplosionRenderer } from "./explosion_renderer.js";

/**
 * エンティティレンダラーの基底クラス
 * 共通のレンダリング機能を提供する
 */
export class EntityRenderer {
    constructor(ctx, imageSrc, width, height, explosionImageSrc) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        
        // エンティティのメイン画像を読み込み
        this.image = new Image();
        this.image.src = imageSrc;
        
        // 爆発レンダラーを初期化
        this.explosionRenderer = new ExplosionRenderer(ctx, explosionImageSrc, width, height, 5, 100);
    }

    /**
     * エンティティの画像を描画する
     * @param {Object} entity - 描画するエンティティ
     */
    drawImage(entity) {
        this.ctx.drawImage(
            this.image,
            entity.cx - this.width / 2,
            entity.cy - this.height / 2,
            this.width,
            this.height
        );
    }

    /**
     * エンティティのコリジョンエリアを描画する
     * @param {Object} entity - 描画するエンティティ
     */
    drawCollisionArea(entity) {
        this.ctx.save();
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(
            entity.cx - entity.width / 2,
            entity.cy - entity.height / 2,
            entity.width,
            entity.height
        );
        this.ctx.restore();
    }

    /**
     * 爆発エフェクトを描画する
     * @param {Object} explosion - 爆発オブジェクト
     */
    drawExplosion(explosion) {
        this.explosionRenderer.render(explosion);
    }

    /**
     * エンティティを描画する（サブクラスでオーバーライドする）
     * @param {Object} entity - 描画するエンティティ
     */
    render(entity) {
        throw new Error("render method must be implemented by subclass");
    }
}