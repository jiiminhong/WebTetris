class Block {
  x;
  y;
  shapeIdx;
  color;
  innerColor;
  shape;
  ctx;

  constructor(ctx) {
    this.ctx = ctx;
    this.createBlocks();
  }

  // 블록 랜덤 선택
  randomBlocks(bidx) {
    return Math.floor(Math.random() * bidx);
  }

  // 블록 생성
  createBlocks() {
    this.shapeIdx = this.randomBlocks(COLOR.length - 1);
    this.color = COLOR[this.shapeIdx][0];
    this.innerColor = COLOR[this.shapeIdx][1];
    this.shape = SHAPE[this.shapeIdx];

    this.x = 3;
    this.y = 0;
  }

  // 블록 그리기
  drawBlocks() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          // this.x, this.y : shape의 상단 왼쪽 좌표
          // this.ctx.fillStyle = this.innerColor;
          this.ctx.fillStyle = "black";
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          this.ctx.fillStyle = this.color;
          this.ctx.fillRect(this.x + x + 0.05, this.y + y + 0.05, 0.95, 0.95);
          this.ctx.fillStyle = this.innerColor;
          this.ctx.fillRect(this.x + x + 0.15, this.y + y + 0.15, 0.75, 0.75);
        }
      });
    });
  }

  // 블록 이동 함수
  move(b) {
    this.x = b.x;
    this.y = b.y;
  }
}
