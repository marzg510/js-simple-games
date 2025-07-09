import { MyBulletRenderer } from '../../shooting/my_bullet_renderer.js';
import { MyBullet } from '../../shooting/my_bullet.js';
import { createContextMock } from '../test_utils/context_mock.js';

QUnit.module('MyBulletRenderer', (hooks) => {
    let ctx, bulletRenderer;

    hooks.beforeEach(() => {
        // ctx のモックを作成
        ctx = createContextMock();

        // BulletRenderer を初期化
        bulletRenderer = new MyBulletRenderer(ctx);
    });

    QUnit.test('アクティブな弾が正しく描画される', (assert) => {
        const bullet = new MyBullet(100, 200, 5); // 弾を初期化

        // 描画を実行
        bulletRenderer.render(bullet);

        // fillRect が正しく呼び出されたか確認
        assert.ok(ctx.fillRect.calledOnce, 'fillRect が1回呼び出される');
        assert.deepEqual(
            ctx.fillRect.firstCall.args,
            [bullet.cx - bullet.width / 2, bullet.cy - bullet.height / 2,
             bullet.width, bullet.height],
            'fillRect が正しい引数で呼び出される'
        );
        // fillStyle の確認
        assert.equal(ctx.fillStyle, 'orange', 'fillStyle が orange に設定されている');
        // コリジョンエリアの確認
        assert.ok(ctx.strokeRect.calledOnce, 'strokeRect が1回呼び出される');
        assert.deepEqual(
            ctx.strokeRect.firstCall.args,
            [bullet.cx - bullet.width / 2, bullet.cy - bullet.height / 2,
             bullet.width, bullet.height],
            'strokeRect が正しい引数で呼び出される'
        );
        // fillStyle の確認
        assert.equal(ctx.strokeStyle, 'red', 'strokeStyle が red に設定されている');
    });

    QUnit.test('非アクティブな弾は描画されない', (assert) => {
        const bullet = new MyBullet(100, 200, 5); // 弾を初期化
        bullet.isActive = false; // 非アクティブに設定

        // 描画を実行
        bulletRenderer.render(bullet);

        // fillRect が呼び出されていないことを確認
        assert.ok(ctx.fillRect.notCalled, '非アクティブな弾は描画されない');
        // コリジョンエリアが呼び出されていないことを確認
        assert.ok(ctx.strokeRect.notCalled, '非アクティブな弾のコリジョンエリアは描画されない');
    });
});