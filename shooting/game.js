import { MyBullet } from './my_bullet.js';
import { MyShip } from './my_ship.js';
import { MyShipStatus } from './my_ship_status.js';
import { EnemyStatus } from './enemy_status.js';
import { ActionRange } from './action_range.js';

export class ShootingGame {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.myShip = new MyShip(
            canvasWidth / 2,
            canvasHeight / 2,
            50, // 自機の幅
            50, // 自機の高さ
            2,  // 自機の速度
            new ActionRange(
                0, // 自機の移動範囲のx座標
                0, // 自機の移動範囲のy座標
                canvasWidth, // 自機の移動範囲の幅
                canvasHeight // 自機の移動範囲の高さ
            )
        );
        this.myBullets = []; // 自機の弾の配列
        this.enemies = []; // 敵の配列
        this.isGameOver = false; // ゲームオーバーかどうか
        this.score = 0; // スコア
        this.hiScore = 0; // ハイスコアを初期化
        this.isNewHiScore = false; // 新しいハイスコアかどうか
        this.isTitleScreen = false; // タイトル画面かどうか
        this.isShootRequested = false; // 発射要求フラグ

    }

    handleShootRequest() {
        this.isShootRequested = true; // 発射要求をセット
    }

    shoot() {
        if (this.myShip.status !== MyShipStatus.ACTIVE) return; // 自機がアクティブでない場合は発射しない
        if (this.myBullets.length >= 2) return; // 弾が2つ以上ある場合は新しい弾を発射しない

        // 弾を発射
        const bullet = new MyBullet(
            this.myShip.cx,
            this.myShip.cy - this.myShip.height,
            5 // 弾の速度
        );
        this.myBullets.push(bullet);
    }

    update(deltaTime) {
        if (this.isTitleScreen || this.isGameOver) return;

        // 発射の要求を処理
        if (this.isShootRequested) {
            this.shoot();
            this.isShootRequested = false; // 発射要求をリセット
        }

        // 自機の移動を更新
        this.myShip.update(deltaTime);

        // 自機の弾を更新
        this.myBullets.forEach((bullet) => bullet.update());

        // 敵を更新
        this.enemies.forEach((enemy) => enemy.update(deltaTime));

        // 弾と敵の当たり判定
        for (const bullet of this.myBullets) {
            for (const enemy of this.enemies) {
                if (enemy.status !== EnemyStatus.ACTIVE) continue; // 敵がアクティブでない場合はスキップ
                if (bullet.isCollidingWith(enemy)) {
                    bullet.isHit = true; // 弾が敵に当たった
                    bullet.isActive = false; // 弾を非アクティブにする
                    enemy.explode();    // 敵の爆発を開始
                    this.score += 10;    // スコアを加算
                    break;
                }
            }
        }
        // 自機と敵の当たり判定
        for (const enemy of this.enemies) {
            if (this.myShip.isCollidingWith(enemy)) {
                this.myShip.explode(); // 自機の爆発を開始
                break;
            }
        }

        // 自機の爆発が終了したら、ゲームオーバーにする
        if (this.myShip.status === MyShipStatus.REMOVED) {
            this.isGameOver = true; // ゲームオーバー状態にする
        }

        this.myBullets = this.myBullets.filter((bullet) => bullet.isActive); // 非アクティブな弾を削除
        this.enemies = this.enemies.filter((enemy) => enemy.cy <= this.canvasHeight); // 画面外に出た敵を削除
        this.enemies = this.enemies.filter((enemy) => enemy.status !== EnemyStatus.REMOVED);    // 削除対象を削除
    }

    reset() {
        this.isGameOver = false;
        this.score = 0;
    }

    getState() {
        return {
            myShip: this.myShip,
            myBullets: this.myBullets,
            enemies: this.enemies,
            score: this.score,
            hiScore: this.hiScore,
        };
    }
}
