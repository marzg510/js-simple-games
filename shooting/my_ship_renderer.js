import { EntityRenderer } from "./entity_renderer.js";
import { MyShipStatus } from "./my_ship_status.js";

export class MyShipRenderer extends EntityRenderer {
    constructor(ctx, myShipImageSrc, width, height, explosionImageSrc) {
        super(ctx, myShipImageSrc, width, height, explosionImageSrc);
    }

    render(myShip) {
        if (myShip.status === MyShipStatus.EXPLODING) {
            this.drawExplosion(myShip.explosion);
            return;
        }

        if (myShip.status === MyShipStatus.ACTIVE) {
            // 自機を描画
            this.drawImage(myShip);

            // コリジョンエリアを描画
            this.drawCollisionArea(myShip);
        }
    }
}
