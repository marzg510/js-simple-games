import { ExplosionRenderer } from '../../shooting/explosion_renderer.js';
import { Explosion } from '../../shooting/explosion.js';
import { createContextMock } from '../test_utils/context_mock.js';

QUnit.module('ExplosionRenderer', (hooks) => {
    let ctx, renderer, explosion;

    hooks.beforeEach(() => {
        // CanvasRenderingContext2D のモックを作成
        ctx = createContextMock();

        // ExplosionRenderer を初期化
        renderer = new ExplosionRenderer(ctx, './explosion.png', 50, 50, 8, 100); // 8フレーム、各フレーム100ms

        // Explosion を初期化
        explosion = new Explosion(100, 100, 50, 50, 800); // duration: 800ms
    });

    QUnit.test('爆発アニメーションを描画する', (assert) => {
        // フレーム幅を設定（通常は画像の読み込み後に設定される）
        renderer.frameWidth = 64; // 仮のフレーム幅

        // 爆発の経過時間を進める
        explosion.update(200); // 200ms 経過

        // 描画を実行
        renderer.render(explosion);

        // drawImage が正しく呼び出されたか確認
        assert.ok(ctx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
            ctx.drawImage.firstCall.args,
            [
                renderer.explosionImage, // スプライトシート画像
                128, // フレームの x 座標 (200ms 経過で3フレーム目)
                0, // フレームの y 座標
                64, // フレームの幅
                renderer.explosionImage.height, // フレームの高さ
                explosion.cx - explosion.width / 2, // 描画先の x 座標
                explosion.cy - explosion.height / 2, // 描画先の y 座標
                explosion.width, // 描画先の幅
                explosion.height, // 描画先の高さ
            ],
            'drawImage が正しい引数で呼び出される'
        );
    });

    QUnit.test('爆発アニメーションが終了した場合、描画されない', (assert) => {
        // フレーム幅を設定
        renderer.frameWidth = 64;

        // 爆発の経過時間を進める（アニメーション終了）
        explosion.update(1000); // 1000ms 経過

        // 描画を実行
        renderer.render(explosion);

        // drawImage が呼び出されないことを確認
        assert.notOk(ctx.drawImage.called, 'アニメーションが終了した場合、drawImage は呼び出されない');
    });

    QUnit.test('画像が読み込まれていない場合、描画されない', (assert) => {
        // frameWidth が未設定の状態
        renderer.frameWidth = undefined;

        // 描画を実行
        renderer.render(explosion);

        // drawImage が呼び出されないことを確認
        assert.notOk(ctx.drawImage.called, '画像が読み込まれていない場合、drawImage は呼び出されない');
    });
});