import { Entity } from "./entity.js";
import { EntityStatus } from "./entity_status.js";

export class Enemy extends Entity {
    constructor(cx, cy, width, height) {
        super(cx, cy, width, height);
        this.status = EntityStatus.ACTIVE; // 敵の状態
    }

    update(deltaTime) {
        switch (this.status) {
            case EntityStatus.ACTIVE:
                this.cy += 1; // 下に移動
                break;
            case EntityStatus.EXPLODING:
                super.handleExplodingState(deltaTime);
                break;
            default:
                // 何もしない
                break;
        }
    }
    
    explode() {
        super.explode(1000); // Enemyの爆発時間は1000ms
    }
    
    remove() {
        super.remove();
    }
}