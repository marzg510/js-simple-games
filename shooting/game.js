import { MyBullet } from './my_bullet.js';
import { Enemy } from './enemy.js';
import { MyShip } from './my_ship.js';

export class ShootingGame {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.myShip = new MyShip(
            canvasWidth / 2,
            canvasHeight / 2,
            50, // 自機の幅
            50, // 自機の高さ
            2,  // 自機のx方向の速度
            2   // 自機のy方向の速度
        );
        this.myBullets = []; // 自機の弾の配列
        this.enemies = []; // 敵の配列
        this.isGameOver = false; // ゲームオーバーかどうか
        this.score = 0; // スコア
        this.hiScore = 0; // ハイスコアを初期化
        this.isNewHiScore = false; // 新しいハイスコアかどうか
        this.isTitleScreen = false; // タイトル画面かどうか

    }

    shoot() {
        // 弾が2つ以上ある場合は新しい弾を発射しない
        if (this.myBullets.length >= 2) {
            return;
        }

        // 弾を発射
        const bullet = new MyBullet(
            this.myShip.x,
            this.myShip.y - this.myShip.height / 2,
            5 // 弾の速度
        );
        this.myBullets.push(bullet);
    }

    update() {
        if (this.isTitleScreen || this.isGameOver) return;

        // 自機の移動を更新
        this.myShip.update(this.canvasWidth, this.canvasHeight);

        // 自機の弾を更新
        this.myBullets.forEach((bullet) => bullet.update());

        // 敵を更新
        this.enemies.forEach((enemy) => enemy.update());

        // 弾と敵の当たり判定
        for (const bullet of this.myBullets) {
            for (const enemy of this.enemies) {
                if (bullet.isCollidingWith(enemy)) {
                    bullet.isHit = true; // 弾が敵に当たった
                    bullet.isActive = false; // 弾を非アクティブにする
                    enemy.isHit = true;  // 敵が弾に当たった
                    this.score += 10;    // スコアを加算
                    break;
                }
            }
        }
        // 自機と敵の当たり判定
        for (const enemy of this.enemies) {
            if (this.myShip.isCollidingWith(enemy)) {
                this.isGameOver = true; // ゲームオーバー状態にする
                console.log("Hit with enemy! Game Over!");
                break;
            }
        }

        this.myBullets = this.myBullets.filter((bullet) => bullet.isActive); // 非アクティブな弾を削除
        this.enemies = this.enemies.filter((enemy) => enemy.y <= this.canvasHeight); // 画面外に出た敵を削除
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
