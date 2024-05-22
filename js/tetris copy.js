class Tetris {
  stage;
  block;
  linescore = 0;

  constructor() {
    this.ctx = ctx;
    this.stage = this.getEmptyStage();
    this.block = new Block();
  }

  reset() {
    this.stage = this.getEmptyStage();
    this.block = new Block();
  }

  getEmptyStage() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  // 유효 검사
  valid(b) {
    return b.shape.every((row, by) => {
      return row.every((value, bx) => {
        let x = b.x + bx;
        let y = b.y + by;
        return value == 0 || (this.isInStage(x, y) && this.isCrash(x, y));
      });
    });
  }

  // 벽에 닿았는지
  isInStage(x, y) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  // 부딪혔는지
  isCrash(x, y) {
    return this.stage[y] && this.stage[y][x] === 0;
  }

  // 블록 회전
  rotate(b) {
    // var clone = JSON.parse(JSON.stringify(b));
    var clone = b;

    for (var y = 0; y < clone.shape.length; ++y) {
      for (var x = 0; x < y; ++x) {
        [clone.shape[x][y], clone.shape[y][x]] = [
          clone.shape[y][x],
          clone.shape[x][y],
        ];
      }
    }

    clone.shape.forEach((row) => row.reverse());

    return clone;
  }

  // 블록 및 화면 그리기
  draw() {
    this.block.drawBlocks();
    this.drawStage();
  }

  // 바닥에 닿았을 때 블록 멈춤
  stopBlock() {
    this.block.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) this.stage[y + this.block.y][x + this.block.x] = value;
      });
    });

    console.table(this.stage);
  }

  // 화면 그리기
  drawStage() {
    this.stage.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          // this.ctx.fillStyle = COLOR[value];
          // this.ctx.fillRect(x, y, 1, 1);

          this.ctx.fillStyle = "black";
          this.ctx.fillRect(x, y, 1, 1);
          this.ctx.fillStyle = COLOR[value - 1][0];
          this.ctx.fillRect(x + 0.05, +y + 0.05, 0.95, 0.95);
          this.ctx.fillStyle = COLOR[value - 1][1];
          this.ctx.fillRect(x + 0.15, +y + 0.15, 0.75, 0.75);
        }
      });
    });
  }

  // 줄 지우기
  deleteLine() {
    this.stage.forEach((row, y) => {
      if (row.every((value) => value > 0)) {
        this.stage.splice(y, 1);
        this.stage.unshift(Array(COLS).fill(0));
        this.linescore += 1;
        console.log(typeof linescore);

        document.getElementById("linescore").innerHTML =
          this.linescore.toString();
      }
    });
  }
}
