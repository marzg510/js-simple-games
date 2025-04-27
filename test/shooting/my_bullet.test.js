import { MyBullet } from '../../shooting/my_bullet.js';

QUnit.module('MyBullet', (hooks) => {
    let bullet;

    hooks.beforeEach(() => {
        // テストごとに新しい弾を初期化
        bullet = new MyBullet(100, 200, 5);
    });

    QUnit.test('初期化時に正しいプロパティが設定される', (assert) => {
        assert.equal(bullet.x, 100, 'x座標が正しい');
        assert.equal(bullet.y, 200, 'y座標が正しい');
        assert.equal(bullet.width, 3, '幅が正しい');
        assert.equal(bullet.height, 30, '高さが正しい');
        assert.equal(bullet.speed, 5, '速度が正しい');
        assert.equal(bullet.isActive, true, '初期状態でアクティブ');
    });

    QUnit.test('updateメソッドで弾が移動する', (assert) => {
        bullet.update();
        assert.equal(bullet.isActive, true, 'アクティブ状態が維持される');
        assert.equal(bullet.y, 195, 'y座標が速度分だけ減少する');
    });

    QUnit.test('画面外に出たら非アクティブになる', (assert) => {
        bullet.y = 0 - bullet.height; // 弾を画面上端に移動
        bullet.update();
        assert.equal(bullet.isActive, false, '画面外に出たら非アクティブ');
    });
});