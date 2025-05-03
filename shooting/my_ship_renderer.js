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
            this.ctx.drawImage(this.image, myShip.x, myShip.y, this.width, this.height);
            // コリジョンエリアを描画
            this.ctx.save();
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(myShip.x, myShip.y, myShip.width, myShip.height);
            this.ctx.restore();
        }
    }
}
