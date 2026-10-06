const fs = require("fs");
const vm = require("vm");
const assert = require("assert");
const listeners = {};
const pointerListeners = {};
const element = () => ({
  innerText: "",
  classList: { add() {}, remove() {}, replace() {} },
  addEventListener(type, callback) {
    listeners[type] = callback;
  },
});
const surface = {
  style: {},
  setPointerCapture() {},
  addEventListener(type, callback) {
    pointerListeners[type] = callback;
  },
};
const cells = Array.from({ length: 4 }, () => ({
  cells: Array.from({ length: 4 }, element),
}));
const controls = {
  tbody: { rows: cells, closest: () => surface },
  ".button": element(),
  ".game-score": element(),
  ".message-start": element(),
  ".message-win": element(),
  ".message-lose": element(),
};
const context = vm.createContext({
  document: {
    querySelector: (selector) => controls[selector],
    addEventListener: (name, fn) => {
      listeners[name] = fn;
    },
  },
  Math,
  JSON,
});
vm.runInContext(
  fs.readFileSync(
    require("path").join(__dirname, "../src/scripts/main.js"),
    "utf8",
  ),
  context,
);
let prevented = false;
listeners.keyup({
  code: "ArrowLeft",
  preventDefault() {
    prevented = true;
  },
});
assert.equal(prevented, false);
listeners.keyup({
  code: "KeyA",
  preventDefault() {
    throw Error("ordinary key");
  },
});
assert.equal(
  JSON.stringify(vm.runInContext("move([2,2,2,2])", context)),
  "[4,4,0,0]",
);
assert.equal(
  JSON.stringify(vm.runInContext("move([2,0,2,4])", context)),
  "[4,4,0,0]",
);
const down = (x, y, extra = {}) =>
  pointerListeners.pointerdown({
    pointerId: 1,
    isPrimary: true,
    button: 0,
    clientX: x,
    clientY: y,
    ...extra,
  });
const up = (x, y) =>
  pointerListeners.pointerup({
    pointerId: 1,
    clientX: x,
    clientY: y,
  });
down(100, 100);
up(10, 100); // Before Start must be harmless.
assert.equal(vm.runInContext("board", context), undefined);
listeners.click();
listeners.keydown({
  code: "ArrowLeft",
  preventDefault() {
    prevented = true;
  },
});
assert.equal(prevented, true);
assert.equal(surface.style.touchAction, "none");
const moves = [];
context.recordMove = (direction) => moves.push(direction);
vm.runInContext("playMove = recordMove", context);
for (const [x, y] of [
  [10, 100],
  [190, 100],
  [100, 10],
  [100, 190],
]) {
  down(100, 100);
  up(x, y);
}
assert.deepEqual(moves, ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]);
down(100, 100);
up(110, 108); // A tap/jitter is not a move.
down(100, 100);
pointerListeners.pointercancel();
up(10, 100);
down(100, 100);
pointerListeners.lostpointercapture();
up(10, 100);
down(100, 100, { isPrimary: false });
up(10, 100);
assert.equal(moves.length, 4);
listeners.keyup({ code: "ArrowRight", preventDefault() {} });
assert.equal(moves[4], "ArrowRight");
console.log(
  "2048: merge rules, keyboard guards, four swipe directions, threshold, cancellation and multitouch passed",
);
