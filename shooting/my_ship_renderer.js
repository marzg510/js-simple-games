import { ExplosionRenderer } from "./explosion_renderer.js";
import { MyShipStatus } from "./my_ship_status.js";

export class MyShipRenderer {
    constructor(ctx, myShipImageSrc, width, height, explosionImageSrc) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = myShipImageSrc;
        this.width = width;
        this.height = height;
        this.explosionRenderer = new ExplosionRenderer(ctx, explosionImageSrc, width, height, 5, 100);
    }

    render(myShip) {
        if (myShip.status === MyShipStatus.EXPLODING) {
            this.explosionRenderer.render(myShip.explosion);
            return;
        }

        if (myShip.status === MyShipStatus.ACTIVE) {
            // 自機を描画
            this.ctx.drawImage(
                this.image,
                myShip.cx - this.width / 2,
                myShip.cy - this.height / 2,
                this.width,
                this.height
            );

            // コリジョンエリアを描画
            this.ctx.save();
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                myShip.cx - myShip.width / 2,
                myShip.cy - myShip.height / 2,
                myShip.width,
                myShip.height
            );
            this.ctx.restore();
        }
    }
}
