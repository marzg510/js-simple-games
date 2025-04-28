import { ShootingGame } from '../../shooting/game.js';
import { Enemy } from '../../shooting/enemy.js';

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

    QUnit.test('弾が正しい位置に生成される', (assert) => {
        game.shoot();
        assert.equal(game.myBullets.length, 1, '弾が1つ生成される');
        const bullet = game.myBullets[0];
        assert.equal(bullet.x, game.myShip.x, '弾のx座標が自機のx座標と一致する');
        assert.equal(bullet.y, game.myShip.y - game.myShip.height / 2, '弾のy座標が自機の上端に生成される');
    });

    QUnit.test('画面外に出た弾が削除される', (assert) => {
        game.shoot();
        const bullet = game.myBullets[0];
        bullet.y = -bullet.height - 1; // 弾を画面外に移動
        game.update();
        assert.equal(game.myBullets.length, 0, '画面外に出た弾が削除される');
    });

    QUnit.test('弾が2つ以上発射されない', (assert) => {
        game.shoot();
        game.shoot();
        game.shoot(); // 3回目の発射は無視される
        assert.equal(game.myBullets.length, 2, '弾は2つまでしか発射されない');
    });

    QUnit.test('画面外に出た弾が削除された後、新しい弾を発射できる', (assert) => {
        game.shoot();
        game.shoot();
        const bullet1 = game.myBullets[0];
        const bullet2 = game.myBullets[1];

        // 弾を画面外に移動
        bullet1.y = -bullet1.height - 1;

        game.update(); // 画面外の弾を削除
        assert.equal(game.myBullets.length, 1, '画面外の弾が削除される');

        game.shoot(); // 新しい弾を発射
        assert.equal(game.myBullets.length, 2, '新しい弾を発射できる');
    });

    QUnit.test('敵が画面外に出たら削除される', (assert) => {
        const enemy = new Enemy(100, 590, 50, 50);
        game.enemies.push(enemy);
        game.update();
        assert.equal(game.enemies.length, 1, '敵はまだ画面内にいる');

        enemy.y = 601; // 敵を画面外に移動
        game.update();
        assert.equal(game.enemies.length, 0, '画面外に出た敵が削除される');
    });
});