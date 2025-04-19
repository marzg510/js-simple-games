// import { detectWallCollision, detectRacketCollision } from './collision_detector.js';
export class ShootingGame {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.myShip = {
            x: canvasWidth / 2,     // 自機のx座標
            y: canvasHeight / 2,    // 自機のy座標
            width: 100,             // 自機の幅
            height: 10,             // 自機の高さ
            dx: 2,                  // 自機のx方向の速度
            dy: 2,                  // 自機のy方向の速度
            movingLeft: false,      // 自機が左に移動中かどうか
            movingRight: false,     // 自機が右に移動中かどうか
            movingUp: false,        // 自機が上に移動中かどうか
            movingDown: false,      // 自機が下に移動中かどうか
        };
        this.isGameOver = false;    // ゲームオーバーかどうか
        this.score = 0;             // スコア
        this.hiScore = 0;           // ハイスコアを初期化
        this.isNewHiScore = false;  // 新しいハイスコアかどうか
        this.isTitleScreen = false; // タイトル画面かどうか
    }

    update() {
        if (this.isTitleScreen || this.isGameOver) return;

        const {myShip} = this;

        // 自機の移動を更新
        if (myShip.movingLeft && myShip.x > 0) {
            myShip.x -= myShip.dx;
        }
        if (myShip.movingRight && myShip.x < myShip.canvasWidth) {
            myShip.x += myShip.dx;
        }
    }

    reset() {
        this.isGameOver = false;
        this.score = 0;
    }

    getState() {
        return {
            myShip: this.myShip,
            score: this.score,
            hiScore: this.hiScore,
        };
    }
};
