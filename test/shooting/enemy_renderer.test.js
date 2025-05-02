import * as sinon from 'sinon';
import { EnemyRenderer } from '../../shooting/enemy_renderer.js';
import { Enemy } from '../../shooting/enemy.js';
import { EnemyStatus } from '../../shooting/enemy_status.js';

QUnit.module('EnemyRenderer', (hooks) => {
    let ctx, renderer, enemy;

    hooks.beforeEach(() => {
        // Image のモックを作成
        global.Image = class {
            constructor() {
                this.src = '';
                this.height = 10;
            }
        };
        // CanvasRenderingContext2D のモックを作成
        ctx = {
            drawImage: sinon.spy(), // drawImage をモック化
            strokeRect: sinon.spy(),
        };

        // EnemyRenderer を初期化
        renderer = new EnemyRenderer(ctx, './enemy.png', 50, 50, './explosion.png',);

        // Enemy を初期化
        enemy = new Enemy(100, 100, 50, 50);
    });

    QUnit.test('アクティブ状態の敵を描画する', (assert) => {
        enemy.status = EnemyStatus.ACTIVE;

        renderer.render(enemy);

        assert.ok(ctx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
          ctx.drawImage.firstCall.args,
          [renderer.enemyImage, enemy.x, enemy.y, 50, 50],
          'drawImage が正しい引数で呼び出される'
        );
    });

    QUnit.test('爆発中の敵を描画する', (assert) => {
        enemy.explode();
        renderer.explosionRenderer.frameWidth = 10;
        renderer.explosionRenderer.frameHeight = 10;

        renderer.render(enemy);

        assert.ok(ctx.drawImage.calledOnce, 'drawImage が1回呼び出される');
        assert.deepEqual(
          ctx.drawImage.firstCall.args,
          [renderer.explosionRenderer.explosionImage, 
           0, 0, // フレームのx, y
           10, 10, // フレームの幅, 高さ
            enemy.x, enemy.y, enemy.width, enemy.height],
          'drawImage が正しい引数で呼び出される'
        );
    });

    QUnit.test('削除状態の敵は描画されない', (assert) => {
        enemy.status = EnemyStatus.REMOVED;

        renderer.render(enemy);

        assert.notOk(ctx.drawImage.called, 'drawImage は呼び出されない');
    });
});