export function detectWallCollision(ball, wallWidth, canvasWidth, canvasHeight) {
  if (ball.x - ball.radius - wallWidth <= 0 || ball.x + ball.radius + wallWidth >= canvasWidth) {
      ball.dx = -ball.dx; // 水平方向の速度を反転
  }
  if (ball.y - ball.radius - wallWidth <= 0) {
      ball.dy = -ball.dy; // 垂直方向の速度を反転
  }
}

export function detectRacketCollision(ball, racket) {
    if (
        ball.y + ball.radius >= racket.y && // ボールがラケットの高さに達した
        ball.x >= racket.x &&               // ボールがラケットの左端より右
        ball.x <= racket.x + racket.width   // ボールがラケットの右端より左
    ) {
        ball.dy = -ball.dy; // 垂直方向の速度を反転
        return true;        // 衝突が発生した
    }
    return false; // 衝突なし
}