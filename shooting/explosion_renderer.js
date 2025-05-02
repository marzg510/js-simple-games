export class ExplosionRenderer {
    constructor(ctx, explosionImageSrc, width, height, frames, frameDuration) {
        this.ctx = ctx; // 描画用のコンテキスト
        this.width = width; // 爆発の幅
        this.height = height; // 爆発の高さ
        this.explosionImage = new Image();
        this.explosionImage.src = explosionImageSrc; // 爆発スプライトシートの画像パス
        this.frames = frames; // スプライトシートのフレーム数
        this.frameDuration = frameDuration; // 各フレームの表示時間（ミリ秒）
        this.currentFrame = 0; // 現在のフレーム
        // Imageの読み込みが完了したら、frameWidthを計算する
        this.explosionImage.onload = () => {
            this.frameWidth = this.explosionImage.width / this.frames; // 各フレームの幅
        }
    }

    render(explosion) {
        // frameWidthが未定義の場合は、画像の読み込みが完了していないため、何もしない
        if (this.frameWidth === undefined) {
            return;
        }
        const currentFrame = Math.floor(explosion.elapsedTime / this.frameDuration);
        if (currentFrame < this.frames) {
            this.ctx.drawImage(
                this.explosionImage,
                currentFrame * this.frameWidth,
                0,
                this.frameWidth,
                this.explosionImage.height,
                explosion.x,
                explosion.y,
                this.width,
                this.height
            );
        }
    }
}