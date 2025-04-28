import { Enemy } from '../../shooting/enemy.js';

QUnit.module('Enemy', (hooks) => {
    let enemy;

    hooks.beforeEach(() => {
        // テストごとに新しい敵を初期化
        enemy = new Enemy(100, 150, 50, 50);
    });

    QUnit.test('初期化時に正しいプロパティが設定される', (assert) => {
        assert.equal(enemy.x, 100, 'x座標が正しい');
        assert.equal(enemy.y, 150, 'y座標が正しい');
        assert.equal(enemy.width, 50, '幅が正しい');
        assert.equal(enemy.height, 50, '高さが正しい');
    });

    QUnit.test('updateメソッドで敵が下に移動する', (assert) => {
        const initialY = enemy.y;
        enemy.update();
        assert.equal(enemy.y, initialY + 1, 'y座標が1増加する');
    });
});