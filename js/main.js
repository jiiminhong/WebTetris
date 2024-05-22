// 게임 상태
var GAME_START = false;

var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

var tetris = new Tetris();

var time;

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// 게임 시작 전 ENTER TO START
if (!GAME_START) {
  console.log("no start");

  ctx.font = "40pt DungGeunMo";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText("Enter", canvas.width / 2, canvas.height / 2 - 80);
  ctx.fillText("To", canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillText("Start", canvas.width / 2, canvas.height / 2 + 40);
}

// ENTER키 눌렀을 때 - 게임 시작
document.addEventListener("keydown", function (e) {
  if (e.keyCode == 13 && !GAME_START) {
    console.log("keydown gamestart");

    // 캔버스 초기화
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    GAME_START = true;
    ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

    // 스테이지 초기화
    resetTetris();
    // tetris.reset();
    // console.table(tetris.stage);

    // 블록 생성
    var block = new Block(ctx);
    block.drawBlocks();
    tetris.block = block;
  }
});

function resetTetris() {
  tetris.reset();
  console.table(tetris.stage);
  time = { start: 0, elapsed: 0 };
}

// 블록 이동 범위 설정
moveBlocks = {
  // 객체 분할 할당으로 생성, 적용
  [KEYBOARD.LEFT]: (b) => ({ ...b, x: b.x - 1 }),
  [KEYBOARD.RIGHT]: (b) => ({ ...b, x: b.x + 1 }),
  [KEYBOARD.DOWN]: (b) => ({ ...b, y: b.y + 1 }),
  [KEYBOARD.UP]: (b) => ({ ...b, y: b.y + 1 }),
  [KEYBOARD.SPACE]: (b) => tetris.rotate(b),
};

// 키보드 눌렀을 때
document.addEventListener("keydown", (e) => {
  if (moveBlocks[e.keyCode]) {
    e.preventDefault();

    var b = moveBlocks[e.keyCode](tetris.block);

    if (e.keyCode == KEYBOARD.UP) {
      // 하드 드롭
      while (tetris.valid(b)) {
        tetris.block.move(b);
        b = moveBlocks[KEYBOARD.DOWN](tetris.block);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        tetris.block.drawBlocks();
      }
    } else if (tetris.valid(b)) {
      tetris.block.move(b);

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      tetris.block.drawBlocks();
    }
  }
});
