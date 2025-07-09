import { Enemy } from '../../shooting/enemy.js';
import { EntityStatus } from '../../shooting/entity_status.js';
import { Explosion } from '../../shooting/explosion.js';

QUnit.module('Enemy', (hooks) => {
    let enemy;

    hooks.beforeEach(() => {
        // テストごとに新しい敵を初期化
        enemy = new Enemy(100, 150, 50, 50);
    });

    QUnit.test('初期化時に正しいプロパティが設定される', (assert) => {
        assert.equal(enemy.cx, 100, 'x座標が正しい');
        assert.equal(enemy.cy, 150, 'y座標が正しい');
        assert.equal(enemy.width, 50, '幅が正しい');
        assert.equal(enemy.height, 50, '高さが正しい');
    });

    QUnit.test('updateメソッドで敵が下に移動する', (assert) => {
        const initialY = enemy.cy;
        enemy.update(16);
        assert.equal(enemy.cy, initialY + 1, 'y座標が1増加する');
    });
    QUnit.test('explodeメソッドで敵が爆発状態になる', (assert) => {
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.EXPLODING, '状態が EXPLODING に変更される');
        assert.ok(enemy.explosion instanceof Explosion, 'Explosion オブジェクトが作成される');
    });

    QUnit.test('updateメソッドで爆発が進行し、終了後に削除状態になる', (assert) => {
        enemy.explode();
        for (let i = 0; i < 10; i++) {
            enemy.update(100); // deltaTime を渡して爆発を進行
        }
        assert.equal(enemy.status, EntityStatus.REMOVED, '爆発が終了し、状態が REMOVED に変更される');
    });

    QUnit.test('removeメソッドで敵が削除状態になる', (assert) => {
        enemy.explode();
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, '状態が REMOVED に変更される');
    });

    QUnit.test('explode() を複数回呼び出しても安全', (assert) => {
        // 最初の explode() 呼び出し
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.EXPLODING, '最初の explode() で爆発状態になる');
        assert.ok(enemy.explosion instanceof Explosion, '爆発オブジェクトが作成される');
        
        const firstExplosion = enemy.explosion;
        
        // 2回目の explode() 呼び出し
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.EXPLODING, '2回目の explode() でも爆発状態が維持される');
        assert.strictEqual(enemy.explosion, firstExplosion, '爆発オブジェクトが変更されない');
        
        // 3回目の explode() 呼び出し
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.EXPLODING, '3回目の explode() でも爆発状態が維持される');
        assert.strictEqual(enemy.explosion, firstExplosion, '爆発オブジェクトが変更されない');
    });

    QUnit.test('remove() を複数回呼び出しても安全', (assert) => {
        // 敵を爆発状態にする
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.EXPLODING, '爆発状態になる');
        
        // 最初の remove() 呼び出し
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, '最初の remove() で削除状態になる');
        
        // 2回目の remove() 呼び出し
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, '2回目の remove() でも削除状態が維持される');
        
        // 3回目の remove() 呼び出し
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, '3回目の remove() でも削除状態が維持される');
    });

    QUnit.test('explode() と remove() を混在して呼び出しても安全', (assert) => {
        // explode() を呼び出し
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.EXPLODING, 'explode() で爆発状態になる');
        
        // remove() を呼び出し
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, 'remove() で削除状態になる');
        
        // 再度 explode() を呼び出し（削除状態からは変更されない）
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.REMOVED, '削除状態では explode() が無効');
        
        // 再度 remove() を呼び出し
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, '削除状態が維持される');
    });

    QUnit.test('非アクティブ状態での explode() 呼び出しは無効', (assert) => {
        // 敵を爆発→削除状態にする
        enemy.explode();
        enemy.remove();
        assert.equal(enemy.status, EntityStatus.REMOVED, '削除状態になる');
        
        // 削除状態で explode() を呼び出し
        enemy.explode();
        assert.equal(enemy.status, EntityStatus.REMOVED, '削除状態では explode() が無効');
        // 削除状態では爆発オブジェクトの有無は気にしない
    });
});