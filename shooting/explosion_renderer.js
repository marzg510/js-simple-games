export class ExplosionRenderer {
    constructor(ctx, explosionImageSrc, frames, frameDuration) {
        this.ctx = ctx; // 描画用のコンテキスト
        this.explosionImage = new Image();
        this.explosionImage.src = explosionImageSrc; // 爆発スプライトシートの画像パス
        this.frames = frames; // スプライトシートのフレーム数
        this.frameDuration = frameDuration; // 各フレームの表示時間（ミリ秒）
        this.currentFrame = 0; // 現在のフレーム
        this.explosionImage.onload = () => {
            this.frameWidth = this.explosionImage.width / this.frames; // 各フレームの幅
        }
    }

    render(explosion) {
        if (this.frameWidth === undefined) {
            console.error("frameWidth is undefined");
            return;
        }
        console.log("ExplosionRenderer.render called", this, explosion);
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
                explosion.width,
                explosion.height
            );
        }
        // this.ctx.drawImage(
        //     this.explosionImage,
        //     this.currentFrame * this.frameWidth,
        //     0,
        //     this.frameWidth,
        //     this.explosionImage.height,
        //     0,0, 50,50
        // );
        // if ( this.currentFrame >= this.frames - 1) {
        //     this.currentFrame = 0; // リセット
        // } else {
        //     this.currentFrame++;
        // }
    }
}