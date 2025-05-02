import { Enemy } from '../../shooting/enemy.js';
import { EnemyStatus } from '../../shooting/enemy_status.js';
import { Explosion } from '../../shooting/explosion.js';

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
        enemy.update(16);
        assert.equal(enemy.y, initialY + 1, 'y座標が1増加する');
    });
    QUnit.test('explodeメソッドで敵が爆発状態になる', (assert) => {
        enemy.explode();
        assert.equal(enemy.status, EnemyStatus.EXPLODING, '状態が EXPLODING に変更される');
        assert.ok(enemy.explosion instanceof Explosion, 'Explosion オブジェクトが作成される');
    });

    QUnit.test('updateメソッドで爆発が進行し、終了後に削除状態になる', (assert) => {
        enemy.explode();
        for (let i = 0; i < 10; i++) {
            enemy.update(100); // deltaTime を渡して爆発を進行
        }
        assert.equal(enemy.status, EnemyStatus.REMOVED, '爆発が終了し、状態が REMOVED に変更される');
    });

    QUnit.test('removeメソッドで敵が削除状態になる', (assert) => {
        enemy.explode();
        enemy.remove();
        assert.equal(enemy.status, EnemyStatus.REMOVED, '状態が REMOVED に変更される');
    });
});