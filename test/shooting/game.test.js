import { ShootingGame, MAX_BULLETS } from '../../shooting/game.js';
import { MyBullet } from '../../shooting/my_bullet.js';
import { Enemy } from '../../shooting/enemy.js';
import { EntityStatus } from '../../shooting/entity_status.js';

QUnit.module('ShootingGame', (hooks) => {
    let game;

    hooks.beforeEach(() => {
        game = new ShootingGame(800, 600); // 幅800、高さ600のキャンバスを想定
    });

    QUnit.test('初期状態の確認', (assert) => {
        assert.equal(game.myShip.cx, 400, '自機の初期位置 (canvasWidth / 2)');
        assert.equal(game.myShip.cy, 300, '自機の初期位置 (canvasHeight / 2)');
        assert.equal(game.isGameOver, false, 'ゲームオーバー状態は false');
        assert.equal(game.score, 0, 'スコアは 0');
        assert.equal(game.hiScore, 0, 'ハイスコアは 0');
    });

    QUnit.test('handleShootRequest が射撃要求を正しく記録する', (assert) => {
        // 初期状態を確認
        assert.equal(game.isShootRequested, false, '初期状態では射撃要求は false');

        // handleShootRequest を呼び出す
        game.handleShootRequest();

        // 射撃要求が記録されていることを確認
        assert.equal(game.isShootRequested, true, 'handleShootRequest を呼び出すと射撃要求が true になる');
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
        assert.equal(bullet.cx, game.myShip.cx, '弾のx座標が自機のx座標と一致する');
        assert.equal(bullet.cy, game.myShip.cy - game.myShip.height, '弾のy座標が自機の上端に生成される');
    });

    QUnit.test('handleShootRequest後にupdateで弾が生成される', (assert) => {
        // 初期状態を確認
        assert.equal(game.isShootRequested, false, '初期状態では射撃要求は false');

        // handleShootRequest を呼び出す
        game.handleShootRequest();
        // update を呼び出す
        game.update(100);   // deltaTimeを仮定

        assert.equal(game.myBullets.length, 1, '弾が1つ生成される');
    });

    QUnit.test('画面外に出た弾が削除される', (assert) => {
        game.shoot();
        const bullet = game.myBullets[0];
        bullet.cy = -bullet.height / 2 - 1; // 弾を画面外に移動
        game.update();
        assert.equal(game.myBullets.length, 0, '画面外に出た弾が削除される');
    });

    QUnit.test('弾が最大数以上発射されない', (assert) => {
        game.shoot();
        game.shoot();
        game.shoot(); // 最大数を超える発射は無視される
        assert.equal(game.myBullets.length, MAX_BULLETS, `弾は${MAX_BULLETS}つまでしか発射されない`);
    });

    QUnit.test('画面外に出た弾が削除された後、新しい弾を発射できる', (assert) => {
        game.shoot();
        game.shoot();
        const bullet1 = game.myBullets[0];
        const bullet2 = game.myBullets[1];

        // 弾を画面外に移動
        bullet1.cy = -bullet1.height / 2 - 1;

        game.update(); // 画面外の弾を削除
        assert.equal(game.myBullets.length, 1, '画面外の弾が削除される');

        game.shoot(); // 新しい弾を発射
        assert.equal(game.myBullets.length, MAX_BULLETS, '新しい弾を発射できる');
    });

    QUnit.test('敵が画面外に出たら削除される', (assert) => {
        const enemy = new Enemy(100, 599, 50, 50);
        game.enemies.push(enemy);
        game.update();
        assert.equal(game.enemies.length, 1, '敵はまだ画面内にいる');

        enemy.y = 601; // 敵を画面外に移動
        game.update();
        assert.equal(game.enemies.length, 0, '画面外に出た敵が削除される');
    });

    QUnit.test('弾が敵に当たった場合、弾と敵の状態が正しく更新される', (assert) => {
        // 敵と弾を初期化
        const bullet = new MyBullet(100, 100, 5);
        const enemy = new Enemy(100, 100, 10, 10); // 弾と重なる位置に敵を配置

        game.myBullets.push(bullet);
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 弾と敵の状態を確認
        assert.ok(bullet.isHit, '弾が敵に当たった状態になる');
        assert.notEqual(bullet.status, EntityStatus.ACTIVE, '弾が非アクティブになる');
        assert.equal(enemy.status, EntityStatus.EXPLODING, '敵が爆発中の状態になる');
    });

    QUnit.test('弾が敵に当たらなかった場合、弾と敵の状態は変化しない', (assert) => {
        // 敵と弾を初期化
        const bullet = new MyBullet(100, 100, 5);
        const enemy = new Enemy(200, 200, 10, 10); // 弾と重ならない位置に敵を配置

        game.myBullets.push(bullet);
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 弾と敵の状態を確認
        assert.notOk(bullet.isHit, '弾が敵に当たっていない状態');
        assert.equal(bullet.status, EntityStatus.ACTIVE, '弾がアクティブなまま');
        assert.equal(enemy.status, EntityStatus.ACTIVE, '敵が通常状態');
    });

    QUnit.test('当たった弾が削除される', (assert) => {
        // 敵と弾を初期化
        const bullet = new MyBullet(100, 100, 5);
        const enemy = new Enemy(100, 100, 10, 10); // 弾と重なる位置に敵を配置

        game.myBullets.push(bullet);
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 配列から削除されていることを確認
        assert.equal(game.myBullets.length, 0, '当たった弾が削除される');
    });

    QUnit.test('スコアが正しく加算される', (assert) => {
        // 敵と弾を初期化
        const bullet = new MyBullet(100, 100, 5);
        const enemy = new Enemy(100, 100, 10, 10); // 弾と重なる位置に敵を配置

        game.myBullets.push(bullet);
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // スコアを確認
        assert.equal(game.score, 10, 'スコアが正しく加算される');
    });

    QUnit.test('弾が爆発中の場合、弾が当たっても、弾と敵の状態は変化しない', (assert) => {
        const initialScore = game.score;
        // 敵と弾を初期化
        const bullet = new MyBullet(100, 100, 5);
        const enemy = new Enemy(100, 100, 10, 10); // 弾と重なる位置に敵を配置
        enemy.explode(); // 敵を爆発状態にする

        game.myBullets.push(bullet);
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 弾と敵の状態を確認
        assert.notOk(bullet.isHit, '弾が敵に当たっていない状態');
        assert.equal(bullet.status, EntityStatus.ACTIVE, '弾がアクティブなまま');
        assert.equal(game.score, initialScore, 'スコアが加算されない');
        assert.equal(enemy.status, EntityStatus.EXPLODING, '敵が爆発状態');
    });

    QUnit.test('弾が削除可能の場合、弾が当たっても、弾と敵の状態は変化しない', (assert) => {
        const initialScore = game.score;
        // 敵と弾を初期化
        const bullet = new MyBullet(100, 100, 5);
        const enemy = new Enemy(100, 100, 10, 10); // 弾と重なる位置に敵を配置
        enemy.explode(); // 敵を爆発状態にする
        enemy.remove(); // 敵を削除状態にする

        game.myBullets.push(bullet);
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 弾と敵の状態を確認
        assert.notOk(bullet.isHit, '弾が敵に当たっていない状態');
        assert.equal(bullet.status, EntityStatus.ACTIVE, '弾がアクティブなまま');
        assert.equal(game.score, initialScore, 'スコアが加算されない');
        assert.equal(enemy.status, EntityStatus.REMOVED, '敵が削除可能状態');
    });

    QUnit.test('削除可能な敵が削除される', (assert) => {
        // 敵を初期化
        const enemy1 = new Enemy(100, 100, 50, 50);
        const enemy2 = new Enemy(200, 200, 50, 50);

        // 敵をゲームに追加
        game.enemies.push(enemy1);
        game.enemies.push(enemy2);

        // 1つの敵を削除対象に設定
        enemy1.status = EntityStatus.REMOVED;

        // ゲームの更新を実行
        game.update();

        // 削除対象の敵が配列から削除されていることを確認
        assert.equal(game.enemies.length, 1, '削除対象の敵が配列から削除される');
        assert.notEqual(game.enemies[0], enemy1, '削除された敵が配列に含まれていない');
        assert.equal(game.enemies[0], enemy2, '削除されていない敵が配列に残っている');
    });

    QUnit.test('自機が敵に当たった場合、自機が爆発状態になる', (assert) => {
        // 自機と敵を初期化
        const enemy = new Enemy(game.myShip.x, game.myShip.y, 50, 50); // 自機と同じ位置に敵を配置
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 自機の状態を確認
        assert.equal(game.myShip.status, EntityStatus.EXPLODING, '自機が爆発状態になる');
    });

    QUnit.test('自機が爆発中の敵に当たっても、自機は爆発しない', (assert) => {
        // 自機と敵を初期化
        const enemy = new Enemy(game.myShip.x, game.myShip.y, 50, 50); // 自機と同じ位置に敵を配置
        enemy.explode(); // 敵を爆発状態にする
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 自機の状態を確認
        assert.equal(game.myShip.status, EntityStatus.ACTIVE, '自機はアクティブ状態のまま');
        assert.equal(enemy.status, EntityStatus.EXPLODING, '敵は爆発状態');
    });

    QUnit.test('自機が削除対象の敵に当たっても、自機は爆発しない', (assert) => {
        // 自機と敵を初期化
        const enemy = new Enemy(game.myShip.cx, game.myShip.cy, 50, 50); // 自機と同じ位置に敵を配置
        enemy.explode(); // 敵を爆発状態にする
        enemy.remove(); // 敵を削除対象にする
        game.enemies.push(enemy);

        // ゲームの更新を実行
        game.update();

        // 自機の状態を確認
        assert.equal(game.myShip.status, EntityStatus.ACTIVE, '自機はアクティブ状態のまま');
        assert.equal(enemy.status, EntityStatus.REMOVED, '敵は削除対象状態');
    });

    QUnit.test('自機の爆発が終了した場合、ゲームオーバーになる', (assert) => {
        const {myShip} = game;
        // 自機を爆発状態に設定
        myShip.explode();

        // 自機の爆発が終了するまで更新
        const deltaTime = 100;  // 100msの経過時間を仮定
        for (let i = 0; i < myShip.explosion.duration / deltaTime; i++) {
            game.update(deltaTime); // deltaTime を渡して更新
        }

        // ゲームの更新を実行
        game.update();

        // ゲームオーバー状態を確認
        assert.ok(game.isGameOver, 'ゲームオーバー状態になる');
    });

    QUnit.test('自機がアクティブでなければ弾は打てない', (assert) => {
        const {myShip} = game;
        // 自機を爆発状態に設定
        myShip.explode();
        // ゲームの更新を実行
        game.update(100);
        // 弾を発射
        game.shoot();
        // ゲームの更新を実行
        game.update(100);
        // 弾が発射されていないことを確認
        assert.equal(game.myBullets.length, 0, '自機が爆発中は、弾は発射されない');

        // 自機を削除
        myShip.remove();
        // ゲームの更新を実行
        game.update(100);
        // 弾を発射
        game.shoot();
        // ゲームの更新を実行
        game.update(100);
        // 弾が発射されていないことを確認
        assert.equal(game.myBullets.length, 0, '自機が削除状態中は、弾は発射されない');
    });

    QUnit.test('発射が阻害される場合、射撃要求が保持される', (assert) => {
        // 弾を最大数追加して発射を阻害
        game.shoot();
        game.shoot();
        assert.equal(game.myBullets.length, MAX_BULLETS, `弾が${MAX_BULLETS}つ発射される`);

        // 射撃要求を設定
        game.handleShootRequest();
        assert.equal(game.isShootRequested, true, '射撃要求が設定される');

        // 更新を実行（発射が阻害されるはず）
        game.update(100);
        assert.equal(game.myBullets.length, MAX_BULLETS, `弾は${MAX_BULLETS}つのまま（新しい弾は発射されない）`);
        assert.equal(game.isShootRequested, true, '射撃要求が保持される');

        // 弾を1つ削除して発射可能にする
        game.myBullets.pop();
        assert.equal(game.myBullets.length, 1, '弾が1つ削除される');

        // 更新を実行（今度は発射されるはず）
        game.update(100);
        assert.equal(game.myBullets.length, MAX_BULLETS, '新しい弾が発射される');
        assert.equal(game.isShootRequested, false, '射撃要求がリセットされる');
    });
});