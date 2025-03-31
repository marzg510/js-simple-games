window.Game = class Game {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ball = {
            x: canvasWidth / 2,     // ボールのx座標
            y: canvasHeight / 2,    // ボールのy座標
            radius: 10,             // ボールの半径
            dx: 2,                  // ボールのx方向の速度
            dy: 2,                  // ボールのy方向の速度
        };
        this.wallWidth = 10;
        this.racket = {
            x: canvasWidth / 2,     // ラケットのx座標
            y: canvasHeight * 0.90, // ラケットのy座標
            width: 100,             // ラケットの幅
            height: 10,             // ラケットの高さ
            dx: 2,                  // ラケットの速度
            movingLeft: false,      // ラケットが左に移動中かどうか
            movingRight: false,     // ラケットが右に移動中かどうか
        };
        this.isGameOver = false;    // ゲームオーバーかどうか
        this.score = 0;             // スコア
        this.hiScore = 0;           // ハイスコアを初期化
        this.isNewHiScore = false;  // 新しいハイスコアかどうか
        this.isTitleScreen = false; // タイトル画面かどうか
    }

    update() {
        if (this.isTitleScreen || this.isGameOver) return;

        const ball = this.ball;
        const racket = this.racket;

        // ボールの位置を更新
        ball.x += ball.dx;
        ball.y += ball.dy;

        // 壁との衝突判定
        CollisionDetector.detectWallCollision(ball, this.wallWidth, this.canvasWidth, this.canvasHeight);

        // ラケットとの衝突判定
        if (CollisionDetector.detectRacketCollision(ball, racket)) {
            this.score += 1; // スコアを加算
        }

        // ボールが下端からはみ出た場合
        if (ball.y - ball.radius > this.canvasHeight) {
            this.isGameOver = true;
        }

        // ラケットの移動を更新
        if (racket.movingLeft && racket.x > this.wallWidth) {
            racket.x -= racket.dx;
        }
        if (racket.movingRight && racket.x + racket.width < this.canvasWidth - this.wallWidth) {
            racket.x += racket.dx;
        }
    }

    reset() {
        this.ball.x = this.canvasWidth / 2;
        this.ball.y = this.canvasHeight / 2;
        this.ball.dx = 2;
        this.ball.dy = 2;
        this.racket.x = this.canvasWidth / 2 - this.racket.width / 2;
        this.isGameOver = false;
        this.score = 0;
    }

    getState() {
        return {
            ball: this.ball,
            wallWidth: this.wallWidth,
            racket: this.racket,
            score: this.score,
            hiScore: this.hiScore,
        };
    }
};
