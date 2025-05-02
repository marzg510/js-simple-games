import { Explosion } from '../../shooting/explosion.js';

QUnit.module('Explosion', (hooks) => {
    let explosion;

    hooks.beforeEach(() => {
        // テストごとに新しい Explosion を初期化
        explosion = new Explosion(100, 100, 50, 50, 1000); // duration: 1000ms
    });

    QUnit.test('初期化時に正しいプロパティが設定される', (assert) => {
        assert.equal(explosion.x, 100, 'x座標が正しい');
        assert.equal(explosion.y, 100, 'y座標が正しい');
        assert.equal(explosion.width, 50, '幅が正しい');
        assert.equal(explosion.height, 50, '高さが正しい');
        assert.equal(explosion.duration, 1000, 'アニメーションの合計時間が正しい');
        assert.equal(explosion.elapsedTime, 0, '初期状態で経過時間は0');
    });

    QUnit.test('updateメソッドで経過時間が増加する', (assert) => {
        explosion.update(500); // 500ms 経過
        assert.equal(explosion.elapsedTime, 500, '経過時間が正しく増加する');

        explosion.update(300); // さらに300ms 経過
        assert.equal(explosion.elapsedTime, 800, '経過時間が累積される');
    });

    QUnit.test('isFinishedメソッドでアニメーションの終了を判定する', (assert) => {
        explosion.update(500); // 500ms 経過
        assert.notOk(explosion.isFinished(), 'アニメーションはまだ終了していない');

        explosion.update(500); // 合計1000ms 経過
        assert.ok(explosion.isFinished(), 'アニメーションが終了している');
    });

    QUnit.test('isFinishedメソッドは経過時間がdurationを超えてもtrueを返す', (assert) => {
        explosion.update(1200); // 1200ms 経過
        assert.ok(explosion.isFinished(), '経過時間がdurationを超えても終了と判定される');
    });
});