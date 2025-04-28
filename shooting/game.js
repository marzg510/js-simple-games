import { MyBullet } from './my_bullet.js';

export class ShootingGame {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.myShip = {
            x: canvasWidth / 2,     // 自機のx座標
            y: canvasHeight / 2,    // 自機のy座標
            width: 50,             // 自機の幅
            height: 50,            // 自機の高さ
            dx: 2,                  // 自機のx方向の速度
            dy: 2,                  // 自機のy方向の速度
            movingLeft: false,      // 自機が左に移動中かどうか
            movingRight: false,     // 自機が右に移動中かどうか
            movingUp: false,        // 自機が上に移動中かどうか
            movingDown: false,      // 自機が下に移動中かどうか
        };
        this.myBullets = [];         // 自機の弾の配列
        this.isGameOver = false;    // ゲームオーバーかどうか
        this.score = 0;             // スコア
        this.hiScore = 0;           // ハイスコアを初期化
        this.isNewHiScore = false;  // 新しいハイスコアかどうか
        this.isTitleScreen = false; // タイトル画面かどうか

    }

    shoot() {
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

        const {myShip} = this;

        // 自機の移動を更新
        if (myShip.movingLeft && myShip.x > 0) {
            myShip.x -= myShip.dx;
        }
        if (myShip.movingRight && myShip.x < this.canvasWidth) {
            myShip.x += myShip.dx;
        }
        if (myShip.movingUp && myShip.y > 0) {
            myShip.y -= myShip.dy;
        }
        if (myShip.movingDown && myShip.y < this.canvasHeight) {
            myShip.y += myShip.dy;
        }
        // 自機の弾を更新
        this.myBullets.forEach((bullet) => bullet.update());
        this.myBullets = this.myBullets.filter((bullet) => bullet.isActive); // 非アクティブな弾を削除
    }

    reset() {
        this.isGameOver = false;
        this.score = 0;
    }

    getState() {
        return {
            myShip: this.myShip,
            myBullets: this.myBullets,
            score: this.score,
            hiScore: this.hiScore,
        };
    }
};
