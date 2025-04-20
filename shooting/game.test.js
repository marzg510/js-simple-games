import { ShootingGame } from './game';

describe('ShootingGame', () => {
    let game;

    beforeEach(() => {
        game = new ShootingGame(800, 600); // 幅800、高さ600のキャンバスを想定
    });

    test('初期状態の確認', () => {
        expect(game.myShip.x).toBe(400); // 自機の初期位置 (canvasWidth / 2)
        expect(game.myShip.y).toBe(300); // 自機の初期位置 (canvasHeight / 2)
        expect(game.isGameOver).toBe(false);
        expect(game.score).toBe(0);
        expect(game.hiScore).toBe(0);
    });

    test('自機が左に移動する', () => {
        game.myShip.movingLeft = true;
        game.update();
        expect(game.myShip.x).toBe(398); // dx = 2 なので 400 - 2 = 398
    });

    test('自機が右に移動する', () => {
        game.myShip.movingRight = true;
        game.update();
        expect(game.myShip.x).toBe(402); // dx = 2 なので 400 + 2 = 402
    });

    test('自機が上に移動する', () => {
        game.myShip.movingUp = true;
        game.update();
        expect(game.myShip.y).toBe(298); // dy = 2 なので 300 - 2 = 298
    });

    test('自機が下に移動する', () => {
        game.myShip.movingDown = true;
        game.update();
        expect(game.myShip.y).toBe(302); // dy = 2 なので 300 + 2 = 302
    });

    test('自機がキャンバスの境界を超えない', () => {
        game.myShip.x = 0;
        game.myShip.movingLeft = true;
        game.update();
        expect(game.myShip.x).toBe(0); // 左端で止まる

        game.myShip.x = 800;
        game.myShip.movingRight = true;
        game.update();
        expect(game.myShip.x).toBe(800); // 右端で止まる

        game.myShip.y = 0;
        game.myShip.movingUp = true;
        game.update();
        expect(game.myShip.y).toBe(0); // 上端で止まる

        game.myShip.y = 600;
        game.myShip.movingDown = true;
        game.update();
        expect(game.myShip.y).toBe(600); // 下端で止まる
    });

    test('resetメソッドが正しく動作する', () => {
        game.myShip.x = 100;
        game.myShip.y = 100;
        game.score = 10;
        game.isGameOver = true;

        game.reset();

        expect(game.myShip.x).toBe(400); // 初期位置に戻る
        expect(game.myShip.y).toBe(300); // 初期位置に戻る
        expect(game.score).toBe(0); // スコアがリセットされる
        expect(game.isGameOver).toBe(false); // ゲームオーバーが解除される
    });
});