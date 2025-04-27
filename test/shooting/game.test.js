import { ShootingGame } from '../../shooting/game.js';

QUnit.module('ShootingGame', (hooks) => {
    let game;

    hooks.beforeEach(() => {
        game = new ShootingGame(800, 600); // 幅800、高さ600のキャンバスを想定
    });

    QUnit.test('初期状態の確認', (assert) => {
        assert.equal(game.myShip.x, 400, '自機の初期位置 (canvasWidth / 2)');
        assert.equal(game.myShip.y, 300, '自機の初期位置 (canvasHeight / 2)');
        assert.equal(game.isGameOver, false, 'ゲームオーバー状態は false');
        assert.equal(game.score, 0, 'スコアは 0');
        assert.equal(game.hiScore, 0, 'ハイスコアは 0');
    });

    QUnit.test('自機が左に移動する', (assert) => {
        game.myShip.movingLeft = true;
        game.update();
        assert.equal(game.myShip.x, 398, 'dx = 2 なので 400 - 2 = 398');
    });

    QUnit.test('自機が右に移動する', (assert) => {
        game.myShip.movingRight = true;
        game.update();
        assert.equal(game.myShip.x, 402, 'dx = 2 なので 400 + 2 = 402');
    });

    QUnit.test('自機が上に移動する', (assert) => {
        game.myShip.movingUp = true;
        game.update();
        assert.equal(game.myShip.y, 298, 'dy = 2 なので 300 - 2 = 298');
    });

    QUnit.test('自機が下に移動する', (assert) => {
        game.myShip.movingDown = true;
        game.update();
        assert.equal(game.myShip.y, 302, 'dy = 2 なので 300 + 2 = 302');
    });

    QUnit.test('自機がキャンバスの境界を超えない', (assert) => {
        game.myShip.x = 0;
        game.myShip.movingLeft = true;
        game.update();
        assert.equal(game.myShip.x, 0, '左端で止まる');

        game.myShip.x = 800;
        game.myShip.movingRight = true;
        game.update();
        assert.equal(game.myShip.x, 800, '右端で止まる');

        game.myShip.y = 0;
        game.myShip.movingUp = true;
        game.update();
        assert.equal(game.myShip.y, 0, '上端で止まる');

        game.myShip.y = 600;
        game.myShip.movingDown = true;
        game.update();
        assert.equal(game.myShip.y, 600, '下端で止まる');
    });

    QUnit.test('resetメソッドが正しく動作する', (assert) => {
        // game.myShip.x = 100;
        // game.myShip.y = 100;
        game.score = 10;
        game.isGameOver = true;

        game.reset();

        // assert.equal(game.myShip.x, 400, '初期位置に戻る (x)');
        // assert.equal(game.myShip.y, 300, '初期位置に戻る (y)');
        assert.equal(game.score, 0, 'スコアがリセットされる');
        assert.equal(game.isGameOver, false, 'ゲームオーバーが解除される');
    });
});