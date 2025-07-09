import { ExplosionRenderer } from "./explosion_renderer.js";

/**
 * エンティティレンダラーの基底クラス
 * 共通のレンダリング機能を提供する
 */
export class EntityRenderer {
    constructor(ctx, imageSrc = null, width = 0, height = 0, explosionImageSrc = null, showCollisionArea = true) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.imageLoaded = false; // 画像の読み込み状態を管理
        this.showCollisionArea = showCollisionArea; // コリジョンエリアの表示フラグ
        
        // エンティティのメイン画像を読み込み
        if (imageSrc) {
            this.image = new Image();
            this.image.onload = () => {
                this.imageLoaded = true;
            };
            this.image.src = imageSrc;
        } else {
            // imageSrcがnullの場合（MyBulletRendererなど）
            this.image = null;
            this.imageLoaded = true;
        }
        
        // 爆発レンダラーを初期化
        this.explosionRenderer = new ExplosionRenderer(ctx, explosionImageSrc, width, height, 5, 100);
    }

    /**
     * 画像が読み込み完了しているかチェックする
     * @returns {boolean} 画像が読み込み完了している場合true
     */
    isImageReady() {
        return this.imageLoaded && (this.image ? this.image.complete : true);
    }

    /**
     * エンティティの画像を描画する
     * @param {Object} entity - 描画するエンティティ
     */
    drawImage(entity) {
        // 画像が読み込まれていない場合は描画しない
        if (!this.isImageReady()) {
            return;
        }
        
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
     * @param {Object} entity - 描画するエンティティ（cx, cy, width, heightプロパティが必須）
     */
    drawCollisionArea(entity) {
        // コリジョンエリアの表示が無効な場合は何もしない
        if (!this.showCollisionArea) return;
        // 必須プロパティの存在を検証
        if (!entity || typeof entity.cx !== 'number' || typeof entity.cy !== 'number' ||
            typeof entity.width !== 'number' || typeof entity.height !== 'number') {
            console.warn('drawCollisionArea: entity must have cx, cy, width, and height properties');
            return;
        }

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
     * @param {Object} _entity - 描画するエンティティ（未使用、サブクラスで使用される）
     */
    render(_entity) {
        throw new Error("render method must be implemented by subclass");
    }
}