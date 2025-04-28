export class EnemyRenderer {
  constructor(ctx, enemyImageSrc, width, height) {
      this.ctx = ctx;
      this.enemyImage = new Image();
      this.enemyImage.src = enemyImageSrc;
      this.width = width;
      this.height = height;
  }

  render(enemy) {
      this.ctx.drawImage(
          this.enemyImage,
          enemy.x,
          enemy.y,
          this.width,
          this.height
      );
      this.ctx.strokeStyle = "red";
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}