import { EntityRenderer } from "./entity_renderer.js";
import { EntityStatus } from "./entity_status.js";

export class MyShipRenderer extends EntityRenderer {
    constructor(ctx, myShipImageSrc, width, height, explosionImageSrc) {
        super(ctx, myShipImageSrc, width, height, explosionImageSrc);
    }

    render(myShip) {
        if (myShip.status === EntityStatus.EXPLODING) {
            this.drawExplosion(myShip.explosion);
            return;
        }

        if (myShip.status === EntityStatus.ACTIVE) {
            // 自機を描画
            this.drawImage(myShip);

            // コリジョンエリアを描画
            this.drawCollisionArea(myShip);
        }
    }
}
