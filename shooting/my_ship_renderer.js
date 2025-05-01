export class MyShipRenderer {
    constructor(ctx, myShipImageSrc, width, height) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = myShipImageSrc;
        this.width = width;
        this.height = height;
    }

    render(myShip) {
        this.ctx.drawImage(
            this.image,
            myShip.x,
            myShip.y,
            this.width,
            this.height
        );
        // コリジョンエリアを描画
        this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(myShip.x, myShip.y, myShip.width, myShip.height);
        this.ctx.restore(); // 状態を復元
    }
}

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