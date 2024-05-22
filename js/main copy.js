// 게임 상태
var GAME_START = false;

// 캔버스
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// FontFace API
let f = new FontFace("DungGeunMo", "url(../fonts/DungGeunMo.woff");

// 테트리스 선언
var tetris = new Tetris(ctx);

// 자동 낙하 설정값
var time = { start: 0, elapsed: 0, level: 1000 };

// 캔버스 사이즈 설정
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// 게임 시작 전 ENTER TO START 문구 띄우기
if (!GAME_START) {
  console.log("no start");

  f.load().then(() => {
    // 캔버스 컨텍스트에서 글꼴을 사용할 준비가 되었습니다.
    ctx.font = "70pt DungGeunMo";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Enter", canvas.width / 2, canvas.height / 2 - 80);
    ctx.fillText("To", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("Start", canvas.width / 2, canvas.height / 2 + 40);

    ctx.font = "70pt DungGeunMo";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText("Enter", canvas.width / 2 + 2, canvas.height / 2 - 80 + 2);
    ctx.fillText("To", canvas.width / 2 + 2, canvas.height / 2 - 20 + 2);
    ctx.fillText("Start", canvas.width / 2 + 2, canvas.height / 2 + 40 + 2);
  });
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

    // 테트리스 반복 실행
    animate();
  }
});

function animate(now = 0) {
  // 경과시간
  time.elapsed = now - time.start;

  if (time.elapsed > time.level) {
    time.start = now;

    let b = moveBlocks[KEYBOARD.DOWN](tetris.block);

    if (tetris.valid(b)) {
      tetris.block.move(b);
    } else {
      tetris.stopBlock();
      tetris.deleteLine();

      // 행렬이 끝나면
      if (tetris.block.y == 0) {
        this.gameOver();
        return;
      }

      tetris.block = new Block(ctx);
    }
  }

  // 스테이지 다시 그리기
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  tetris.draw();

  // 다음 프레임 요청
  requestId = requestAnimationFrame(animate);
}

function resetTetris() {
  tetris.reset();
  console.table(tetris.stage);
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

// 게임 오버
function gameOver() {
  cancelAnimationFrame(requestId);
  GAME_START = false;

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  f.load().then(() => {
    // Ready to use the font in a canvas context
    ctx.font = "80px DungGeunMo";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

    ctx.font = "80px DungGeunMo";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2 + 2, canvas.height / 2 + 2);

    ctx.font = "30px DungGeunMo";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Enter To Restart", canvas.width / 2, canvas.height / 2 + 50);
  });

  // ctx.font = "80px DungGeunMo";
  // ctx.fillStyle = "yellow";
  // ctx.textAlign = "center";
  // ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);

  // ctx.font = "80px DungGeunMo";
  // ctx.fillStyle = "red";
  // ctx.textAlign = "center";
  // ctx.fillText("GAME OVER", canvas.width / 2 + 2, canvas.height / 2 + 2);

  // ctx.font = "30px DungGeunMo";
  // ctx.fillStyle = "white";
  // ctx.textAlign = "center";
  // ctx.fillText("Enter To Restart", canvas.width / 2, canvas.height / 2 + 50);
}
