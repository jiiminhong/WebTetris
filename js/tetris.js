class Tetris {
  stage;
  block;

  reset() {
    this.stage = this.getEmptyStage();
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

  isInStage(x, y) {
    return x >= 0 && x < COLS && y <= ROWS;
  }

  isCrash(x, y) {
    return this.stage[y] && this.stage[y][x] === 0;
  }

  // 블럭 회전
  rotate(b) {
    var clone = JSON.parse(JSON.stringify(b));

    for (let y = 0; y < b.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [b.shape[x][y], b.shape[y][x]] = [b.shape[y][x], b.shape[x][y]];
      }
    }

    b.shape.forEach((row) => row.reverse());

    return clone;
  }
}
