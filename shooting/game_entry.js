import { ShootingGame } from './game.js';
import { Renderer } from './renderer.js';
import { Enemy } from './enemy.js';
// import { getHiScore, saveHiScore } from './hi_score.js'; // TODO:後できちんと実装

const GAME_OVER_TIMEOUT = 2999; // ゲームオーバー後のタイムアウト期間（ミリ秒）

export async function init() {
    // canvasとctxを初期化
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const myShipImageSrc = "./assets/myship2.png"; // 敵の画像のパス
    const enemyImageSrc = "./assets/enemy.png"; // 敵の画像のパス
    const explosionImageSrc = "./assets/explosion.png"; // 爆発画像のパス
    const renderer = new Renderer(ctx, myShipImageSrc, enemyImageSrc, explosionImageSrc);

    // ゲームロジックを管理するインスタンスを作成
    const game = new ShootingGame(canvas.width, canvas.height);
    game.isTitleScreen = false;
    game.enemies.push(new Enemy(100, 0, 50, 50)); // テスト的に敵を追加　 TODO:後できちんと実装

    // Firebaseからハイスコアを取得　TODO:後で実装
    // game.hiScore = await getHiScore();

    // キーボードイベントを設定
    setupKeyboardEvents(game, renderer);

    // ゲームループを開始
    gameLoop(game, renderer);
}

function gameLoop(game, renderer) {
    let lastTimestamp = 0;

    function step(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        if (game.isTitleScreen) {
            renderer.render(game.getState());
            renderer.renderTitleScreen();
            return;
        }

        if (game.isGameOver) {
            handleGameOver(game, renderer);
            return;
        }

        game.update(deltaTime);
        renderer.render(game.getState());

        requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// キーボードイベントを設定する
export function setupKeyboardEvents(game, renderer) {
    document.addEventListener("keydown", (e) => {
        if (game.isTitleScreen) {
            game.isTitleScreen = false;
            gameLoop(game, renderer);
        }
        if (e.key === "ArrowLeft") {
            game.myShip.movingLeft = true;
        }
        if (e.key === "ArrowRight") {
            game.myShip.movingRight = true;
        }
        if (e.key === "ArrowUp") {
            game.myShip.movingUp = true;
        }
        if (e.key === "ArrowDown") {
            game.myShip.movingDown = true;
        }
        if (e.key === "z" || e.key === "Z") { // Zキーが押された場合
            game.handleShootRequest(); // 発射要求を処理
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowLeft") {
            game.myShip.movingLeft = false;
        }
        if (e.key === "ArrowRight") {
            game.myShip.movingRight = false;
        }
        if (e.key === "ArrowUp") {
            game.myShip.movingUp = false;
        }
        if (e.key === "ArrowDown") {
            game.myShip.movingDown = false;
        }
    });
}

// ゲームオーバー時の処理
export function handleGameOver(game, renderer) {
    // ハイスコアを更新して保存
    if (game.score > game.hiScore) {
        game.hiScore = game.score;
        game.isNewHiScore = true; // 新しいハイスコア
        saveHiScore(game.hiScore); // Firebaseに保存
    } else {
        game.isNewHiScore = false; // 新しいハイスコアではない
    }

    // ゲームオーバー画面を描画
    renderer.renderGameOver(game.isNewHiScore);

    // タイトル画面に戻る処理
    // setTimeout(() => {
    //     game.isTitleScreen = true;
    //     game.reset();
    //     gameLoop(game, renderer);
    // }, GAME_OVER_TIMEOUT);
}
window.init = init; // init関数をグローバルに公開