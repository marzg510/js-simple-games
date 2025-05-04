import * as sinon from 'sinon';
import { MyShipRenderer } from '../../shooting/my_ship_renderer.js';
import { MyShip } from '../../shooting/my_ship.js';
import { MyShipStatus } from '../../shooting/my_ship_status.js';

QUnit.module('MyShipRenderer', (hooks) => {
    let ctx, renderer, ship;

    hooks.beforeEach(() => {
        // Image のモックを作成
        global.Image = class {
            constructor() {
                this.src = '';
                this.height = 10;
            }
        };
        // ctx のモックを作成
        ctx = {
            drawImage: sinon.spy(),
            strokeRect: sinon.spy(),
            strokeStyle: null,
            lineWidth: null,
            save: sinon.spy(),
            restore: sinon.spy(),
        };

        // MyShipRenderer を初期化
        renderer = new MyShipRenderer(ctx, './assets/my_ship.png', 50, 50);
        ship = new MyShip(100, 200, 50, 50, 5, 5); // 自機を初期化
    });

    QUnit.test('自機が正しく描画される', (assert) => {
        // 描画を実行
        renderer.render(ship);

        // drawImage が正しく呼び出されたか確認
        assert.ok(ctx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
            ctx.drawImage.firstCall.args,
            [renderer.image, ship.cx - ship.width / 2, ship.cy - ship.height / 2, 50, 50],
            'drawImage が正しい引数で呼び出される'
        );

        // strokeRect が正しく呼び出されたか確認
        assert.ok(ctx.strokeRect.calledOnce, 'strokeRect が1回呼び出される');
        assert.deepEqual(
            ctx.strokeRect.firstCall.args,
            [ship.cx - ship.width / 2, ship.cy - ship.height / 2, ship.width, ship.height],
            'strokeRect が正しい引数で呼び出される'
        );

        // strokeStyle と lineWidth の確認
        assert.equal(ctx.strokeStyle, 'red', 'strokeStyle が red に設定されている');
        assert.equal(ctx.lineWidth, 2, 'lineWidth が 2 に設定されている');
    });

    QUnit.test('描画後に状態が復元される', (assert) => {
        // 描画を実行
        renderer.render(ship);

        // restore が正しく呼び出されたか確認
        assert.ok(ctx.restore.calledOnce, 'restore が1回呼び出される');
    });

    QUnit.test('爆発中の自機を描画する', (assert) => {
        ship.explode();
        renderer.explosionRenderer.frameWidth = 10;

        renderer.render(ship);

        assert.ok(ctx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
          ctx.drawImage.firstCall.args,
          [renderer.explosionRenderer.explosionImage, 
           0, 0, // フレームのx, y
           10, 10, // フレームの幅, 高さ
            ship.cx - ship.width / 2, ship.cy - ship.height / 2, ship.width, ship.height],
          'drawImage が正しい引数で呼び出される'
        );
    });

    QUnit.test('削除状態の自機は描画されない', (assert) => {
        ship.status = MyShipStatus.REMOVED;

        renderer.render(ship);

        assert.notOk(ctx.drawImage.called, 'drawImage は呼び出されない');
    });
});