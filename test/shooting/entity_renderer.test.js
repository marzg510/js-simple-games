import * as sinon from 'sinon';
import { EntityRenderer } from '../../shooting/entity_renderer.js';
import { createContextMock, createImageMock } from '../test_utils/context_mock.js';

QUnit.module('EntityRenderer', (hooks) => {
    let ctx, renderer;

    hooks.beforeEach(() => {
        // Image のモックを作成
        global.Image = createImageMock();
        
        // CanvasRenderingContext2D のモックを作成
        ctx = createContextMock();

        // EntityRenderer を初期化
        renderer = new EntityRenderer(ctx, './entity.png', 50, 50, './explosion.png');
    });

    QUnit.test('constructor が正しく初期化される', (assert) => {
        assert.equal(renderer.ctx, ctx, 'コンテキストが正しく設定される');
        assert.equal(renderer.width, 50, '幅が正しく設定される');
        assert.equal(renderer.height, 50, '高さが正しく設定される');
        assert.ok(renderer.image, '画像オブジェクトが作成される');
        assert.equal(renderer.image.src, './entity.png', '画像のソースが正しく設定される');
        assert.ok(renderer.explosionRenderer, '爆発レンダラーが作成される');
    });

    QUnit.test('drawImage が正しく動作する', (assert) => {
        const entity = { cx: 100, cy: 200 };
        
        renderer.drawImage(entity);
        
        assert.ok(ctx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
            ctx.drawImage.firstCall.args,
            [renderer.image, 75, 175, 50, 50], // cx-width/2, cy-height/2
            'drawImage が正しい引数で呼び出される'
        );
    });

    QUnit.test('drawCollisionArea が正しく動作する', (assert) => {
        const entity = { cx: 100, cy: 200, width: 30, height: 40 };
        
        renderer.drawCollisionArea(entity);
        
        assert.ok(ctx.save.calledOnce, 'save が1回呼び出される');
        assert.equal(ctx.strokeStyle, 'red', 'strokeStyle が red に設定される');
        assert.equal(ctx.lineWidth, 2, 'lineWidth が 2 に設定される');
        assert.ok(ctx.strokeRect.calledOnce, 'strokeRect が1回呼び出される');
        assert.deepEqual(
            ctx.strokeRect.firstCall.args,
            [85, 180, 30, 40], // cx-width/2, cy-height/2, width, height
            'strokeRect が正しい引数で呼び出される'
        );
        assert.ok(ctx.restore.calledOnce, 'restore が1回呼び出される');
    });

    QUnit.test('drawExplosion が爆発レンダラーに委譲される', (assert) => {
        const explosion = { cx: 100, cy: 200, elapsedTime: 0 };
        
        // 爆発レンダラーのrenderメソッドをスパイ
        renderer.explosionRenderer.render = sinon.spy();
        
        renderer.drawExplosion(explosion);
        
        assert.ok(renderer.explosionRenderer.render.calledOnce, '爆発レンダラーのrender が1回呼び出される');
        assert.deepEqual(
            renderer.explosionRenderer.render.firstCall.args,
            [explosion],
            '爆発レンダラーのrender が正しい引数で呼び出される'
        );
    });

    QUnit.test('render メソッドが実装されていない場合エラーが発生する', (assert) => {
        const entity = { cx: 100, cy: 200 };
        
        assert.throws(() => {
            renderer.render(entity);
        }, /render method must be implemented by subclass/, 'サブクラスでの実装が必要なエラーが発生する');
    });
});