"use strict";

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 40;

const KEYBOARD = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

const COLOR = [
  ["#17A9DE", "#11688A"],
  ["#FED01A", "#AA8B11"],
  ["#EE3F4D", "#9B2831"],
  ["#78C53D", "#457123"],
  ["#1A73C4", "#0D4270"],
  ["#FF851A", "#AA5A11"],
  ["#A042A1", "#4C1F4E"],
];

const SHAPE = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [2, 2],
    [2, 2],
  ],
  [
    [3, 3, 0],
    [0, 3, 3],
    [0, 0, 0],
  ],
  [
    [0, 4, 4],
    [4, 4, 0],
    [0, 0, 0],
  ],
  [
    [5, 0, 0],
    [5, 5, 5],
    [0, 0, 0],
  ],
  [
    [0, 0, 6],
    [6, 6, 6],
    [0, 0, 0],
  ],
  [
    [0, 7, 0],
    [7, 7, 7],
    [0, 0, 0],
  ],
];

Object.freeze(KEYBOARD, COLOR, SHAPE);
