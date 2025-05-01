import * as sinon from 'sinon';
import { MyShipRenderer } from '../../shooting/my_ship_renderer.js';
import { MyShip } from '../../shooting/my_ship.js';

QUnit.module('MyShipRenderer', (hooks) => {
    let mockCtx, shipRenderer;

    hooks.beforeEach(() => {
        // Image のモックを作成
        global.Image = class {
            constructor() {
                this.src = '';
            }
        };
        // ctx のモックを作成
        mockCtx = {
            drawImage: sinon.spy(),
            strokeRect: sinon.spy(),
            strokeStyle: null,
            lineWidth: null,
            restore: sinon.spy(),
        };

        // MyShipRenderer を初期化
        shipRenderer = new MyShipRenderer(mockCtx, './assets/my_ship.png', 50, 50);
    });

    QUnit.test('自機が正しく描画される', (assert) => {
        const ship = new MyShip(100, 200, 50, 50, 5, 5); // 自機を初期化

        // 描画を実行
        shipRenderer.render(ship);

        // drawImage が正しく呼び出されたか確認
        assert.ok(mockCtx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
            mockCtx.drawImage.firstCall.args,
            [shipRenderer.image, ship.x, ship.y, 50, 50],
            'drawImage が正しい引数で呼び出される'
        );

        // strokeRect が正しく呼び出されたか確認
        assert.ok(mockCtx.strokeRect.calledOnce, 'strokeRect が1回呼び出される');
        assert.deepEqual(
            mockCtx.strokeRect.firstCall.args,
            [ship.x, ship.y, ship.width, ship.height],
            'strokeRect が正しい引数で呼び出される'
        );

        // strokeStyle と lineWidth の確認
        assert.equal(mockCtx.strokeStyle, 'red', 'strokeStyle が red に設定されている');
        assert.equal(mockCtx.lineWidth, 2, 'lineWidth が 2 に設定されている');
    });

    QUnit.test('描画後に状態が復元される', (assert) => {
        const ship = new MyShip(100, 200, 50, 50, 5, 5); // 自機を初期化

        // 描画を実行
        shipRenderer.render(ship);

        // restore が正しく呼び出されたか確認
        assert.ok(mockCtx.restore.calledOnce, 'restore が1回呼び出される');
    });
});