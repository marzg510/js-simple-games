import { MyShip } from '../../shooting/my_ship.js';

QUnit.module('MyShip', (hooks) => {
    let ship;

    hooks.beforeEach(() => {
        // テストごとに新しい自機を初期化
        ship = new MyShip(100, 100, 50, 50, 5, 5);
    });

    QUnit.test('初期化時に正しいプロパティが設定される', (assert) => {
        assert.equal(ship.x, 100, 'x座標が正しい');
        assert.equal(ship.y, 100, 'y座標が正しい');
        assert.equal(ship.width, 50, '幅が正しい');
        assert.equal(ship.height, 50, '高さが正しい');
        assert.equal(ship.dx, 5, 'x方向の速度が正しい');
        assert.equal(ship.dy, 5, 'y方向の速度が正しい');
    });

    QUnit.test('左に移動する', (assert) => {
        ship.movingLeft = true;
        ship.update(800, 600); // キャンバスサイズを渡す
        assert.equal(ship.x, 95, 'x座標が左に移動する');
    });

    QUnit.test('右に移動する', (assert) => {
        ship.movingRight = true;
        ship.update(800, 600); // キャンバスサイズを渡す
        assert.equal(ship.x, 105, 'x座標が右に移動する');
    });

    QUnit.test('上に移動する', (assert) => {
        ship.movingUp = true;
        ship.update(800, 600); // キャンバスサイズを渡す
        assert.equal(ship.y, 95, 'y座標が上に移動する');
    });

    QUnit.test('下に移動する', (assert) => {
        ship.movingDown = true;
        ship.update(800, 600); // キャンバスサイズを渡す
        assert.equal(ship.y, 105, 'y座標が下に移動する');
    });

    QUnit.test('キャンバスの左端を超えない', (assert) => {
        ship.x = 0;
        ship.movingLeft = true;
        ship.update(800, 600);
        assert.equal(ship.x, 0, 'x座標が0未満にならない');
    });

    QUnit.test('キャンバスの右端を超えない', (assert) => {
        ship.x = 800 - ship.width;
        ship.movingRight = true;
        ship.update(800, 600);
        assert.equal(ship.x, 800 - ship.width, 'x座標がキャンバス幅を超えない');
    });

    QUnit.test('キャンバスの上端を超えない', (assert) => {
        ship.y = 0;
        ship.movingUp = true;
        ship.update(800, 600);
        assert.equal(ship.y, 0, 'y座標が0未満にならない');
    });

    QUnit.test('キャンバスの下端を超えない', (assert) => {
        ship.y = 600 - ship.height;
        ship.movingDown = true;
        ship.update(800, 600);
        assert.equal(ship.y, 600 - ship.height, 'y座標がキャンバス高さを超えない');
    });
});