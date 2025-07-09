import { MyShip } from '../../shooting/my_ship.js';
import { EntityStatus } from '../../shooting/entity_status.js';
import { Explosion } from '../../shooting/explosion.js';
import { Enemy } from '../../shooting/enemy.js';
import { ActionRange } from '../../shooting/action_range.js';

QUnit.module('MyShip', (hooks) => {
    let ship;

    hooks.beforeEach(() => {
        // テストごとに新しい自機を初期化
        ship = new MyShip(100, 100, 50, 50, 5, new ActionRange(10, 20, 800, 600));
    });

    QUnit.test('初期化時に正しいプロパティが設定される', (assert) => {
        assert.equal(ship.cx, 100, 'x座標が正しい');
        assert.equal(ship.cy, 100, 'y座標が正しい');
        assert.equal(ship.width, 50, '幅が正しい');
        assert.equal(ship.height, 50, '高さが正しい');
        assert.equal(ship.speed, 5, 'x方向の速度が正しい');
    });

    QUnit.test('左に移動する', (assert) => {
        ship.movingLeft = true;
        ship.update();
        assert.equal(ship.cx, 95, 'x座標が左に移動する');
    });

    QUnit.test('右に移動する', (assert) => {
        ship.movingRight = true;
        ship.update();
        assert.equal(ship.cx, 105, 'x座標が右に移動する');
    });

    QUnit.test('上に移動する', (assert) => {
        ship.movingUp = true;
        ship.update();
        assert.equal(ship.cy, 95, 'y座標が上に移動する');
    });

    QUnit.test('下に移動する', (assert) => {
        ship.movingDown = true;
        ship.update();
        assert.equal(ship.cy, 105, 'y座標が下に移動する');
    });

    QUnit.test('キャンバスの左端を超えない', (assert) => {
        ship.actionRange.x = 10;
        ship.x = 10;
        ship.movingLeft = true;
        ship.update()
        assert.equal(ship.x, 10, 'x座標が0未満にならない');
    });

    QUnit.test('キャンバスの右端を超えない', (assert) => {
        ship.actionRange.width = 800;
        ship.x = 800;
        ship.movingRight = true;
        ship.update();
        assert.equal(ship.x, 800, 'x座標がキャンバス幅を超えない');
    });

    QUnit.test('キャンバスの上端を超えない', (assert) => {
        ship.actionRange.y = 20;
        ship.y = 20;
        ship.movingUp = true;
        ship.update();
        assert.equal(ship.y, 20, 'y座標が0未満にならない');
    });

    QUnit.test('キャンバスの下端を超えない', (assert) => {
        ship.actionRange.y = 600;
        ship.y = 600;
        ship.movingDown = true;
        ship.update();
        assert.equal(ship.y, 600, 'y座標がキャンバス高さを超えない');
    });

    QUnit.test('explodeメソッドで自機が爆発状態になる', (assert) => {
        ship.explode();
        assert.equal(ship.status, EntityStatus.EXPLODING, '状態が EXPLODING に変更される');
        assert.ok(ship.explosion instanceof Explosion, 'Explosion オブジェクトが作成される');
    });

    QUnit.test('updateメソッドで爆発が進行し、終了後に削除状態になる', (assert) => {
        ship.explode();
        for (let i = 0; i < 10; i++) {
            ship.update(200); // deltaTime を渡して爆発を進行
        }
        assert.equal(ship.status, EntityStatus.REMOVED, '爆発が終了し、状態が REMOVED に変更される');
    });

    QUnit.test('removeメソッドで自機が削除状態になる', (assert) => {
        ship.explode();
        ship.remove();
        assert.equal(ship.status, EntityStatus.REMOVED, '状態が REMOVED に変更される');
    });

    QUnit.test('removeメソッドで自機がACTIVE状態のままである', (assert) => {  
        // Assuming ship is initialized and in ACTIVE state by default.  
        ship.remove();  
        assert.equal(ship.status, EntityStatus.ACTIVE, '状態が ACTIVE のままである');  
    });

    QUnit.test('getBounds が正しい境界値を返す', (assert) => {
        const bounds = ship.getBounds();

        assert.equal(bounds.left, 75, '左端が正しい (cx - width / 2)');
        assert.equal(bounds.right, 125, '右端が正しい (cx + width / 2)');
        assert.equal(bounds.top, 75, '上端が正しい (cy - height / 2)');
        assert.equal(bounds.bottom, 125, '下端が正しい (cy + height / 2)');
    });

    QUnit.test('getBounds が移動後の境界値を正しく返す', (assert) => {
        // 自機を移動
        ship.cx = 150;
        ship.cy = 200;

        const bounds = ship.getBounds();

        assert.equal(bounds.left, 125, '移動後の左端が正しい (cx - width / 2)');
        assert.equal(bounds.right, 175, '移動後の右端が正しい (cx + width / 2)');
        assert.equal(bounds.top, 175, '移動後の上端が正しい (cy - height / 2)');
        assert.equal(bounds.bottom, 225, '移動後の下端が正しい (cy + height / 2)');
    });
});

QUnit.module('MyShip - Collision Detection', (hooks) => {
    let ship;

    hooks.beforeEach(() => {
        // テストごとに新しい自機を初期化
        ship = new MyShip(100, 100, 50, 50, 5, 5);
    });
    QUnit.test('敵と衝突している場合、true を返す', (assert) => {
        const enemy = new Enemy(120, 120, 30, 30); // 自機と重なる位置に敵を配置
        assert.ok(ship.isCollidingWith(enemy), '敵と衝突している場合、true を返す');
    });

    QUnit.test('敵と衝突していない場合、false を返す (右側)', (assert) => {
        const enemy = new Enemy(200, 100, 30, 30); // 自機の右側に敵を配置
        assert.notOk(ship.isCollidingWith(enemy), '敵と衝突していない場合、false を返す');
    });

    QUnit.test('敵と衝突していない場合、false を返す (左側)', (assert) => {
        const enemy = new Enemy(50, 100, 30, 30); // 自機の左側に敵を配置
        assert.notOk(ship.isCollidingWith(enemy), '敵と衝突していない場合、false を返す');
    });

    QUnit.test('敵と衝突していない場合、false を返す (上側)', (assert) => {
        const enemy = new Enemy(100, 50, 30, 30); // 自機の上側に敵を配置
        assert.notOk(ship.isCollidingWith(enemy), '敵と衝突していない場合、false を返す');
    });

    QUnit.test('敵と衝突していない場合、false を返す (下側)', (assert) => {
        const enemy = new Enemy(100, 200, 30, 30); // 自機の下側に敵を配置
        assert.notOk(ship.isCollidingWith(enemy), '敵と衝突していない場合、false を返す');
    });

    QUnit.test('敵が自機の境界線上にある場合、false を返す', (assert) => {
        const enemy = new Enemy(125+15, 100, 30, 30); // 自機の右端に接する位置に敵を配置
        assert.notOk(ship.isCollidingWith(enemy), '敵が自機の境界線上にある場合、true を返す');
    });
    
});