import * as sinon from 'sinon';

/**
 * 全てのrendererテストで使用される共通のCanvasRenderingContext2Dモック
 * @returns {Object} モックされたCanvasRenderingContext2D
 */
export function createContextMock() {
    return {
        // 描画関連
        drawImage: sinon.spy(),
        fillRect: sinon.spy(),
        strokeRect: sinon.spy(),
        
        // スタイル関連
        fillStyle: null,
        strokeStyle: null,
        lineWidth: null,
        
        // 状態管理
        save: sinon.spy(),
        restore: sinon.spy(),
    };
}

/**
 * 全てのrendererテストで使用される共通のImageモック
 * @returns {Function} モックされたImageクラス
 */
export function createImageMock() {
    return class {
        constructor() {
            this.src = '';
            this.height = 10;
        }
    };
}