import * as sinon from 'sinon';
import { MyBulletRenderer } from '../../shooting/my_bullet_renderer.js';
import { MyBullet } from '../../shooting/my_bullet.js';

QUnit.module('BulletRenderer', (hooks) => {
    let mockCtx, bulletRenderer;

    hooks.beforeEach(() => {
        // ctx のモックを作成
        mockCtx = {
            fillRect: sinon.spy(),
            fillStyle: null,
            strokeRect: sinon.spy(),
            strokeStyle: null,
            save: sinon.spy(),
            restore: sinon.spy(),
        };

        // BulletRenderer を初期化
        bulletRenderer = new MyBulletRenderer(mockCtx);
    });

    QUnit.test('アクティブな弾が正しく描画される', (assert) => {
        const bullet = new MyBullet(100, 200, 5); // 弾を初期化

        // 描画を実行
        bulletRenderer.render(bullet);

        // fillRect が正しく呼び出されたか確認
        assert.ok(mockCtx.fillRect.calledOnce, 'fillRect が1回呼び出される');
        assert.deepEqual(
            mockCtx.fillRect.firstCall.args,
            [bullet.x, bullet.y, bullet.width, bullet.height],
            'fillRect が正しい引数で呼び出される'
        );
        // fillStyle の確認
        assert.equal(mockCtx.fillStyle, 'orange', 'fillStyle が orange に設定されている');
        // コリジョンエリアの確認
        assert.ok(mockCtx.strokeRect.calledOnce, 'strokeRect が1回呼び出される');
        assert.deepEqual(
            mockCtx.strokeRect.firstCall.args,
            [bullet.x, bullet.y, bullet.width, bullet.height],
            'strokeRect が正しい引数で呼び出される'
        );
        // fillStyle の確認
        assert.equal(mockCtx.strokeStyle, 'red', 'strokeStyle が red に設定されている');
    });

    QUnit.test('非アクティブな弾は描画されない', (assert) => {
        const bullet = new MyBullet(100, 200, 5); // 弾を初期化
        bullet.isActive = false; // 非アクティブに設定

        // 描画を実行
        bulletRenderer.render(bullet);

        // fillRect が呼び出されていないことを確認
        assert.ok(mockCtx.fillRect.notCalled, '非アクティブな弾は描画されない');
        // コリジョンエリアが呼び出されていないことを確認
        assert.ok(mockCtx.strokeRect.notCalled, '非アクティブな弾のコリジョンエリアは描画されない');
    });
});