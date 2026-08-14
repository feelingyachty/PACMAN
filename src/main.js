import "./style.css";
import { Game } from "./game.js";

const canvas = document.getElementById("game");
const hud = {
  score: document.getElementById("score"),
  lives: document.getElementById("lives"),
  status: document.getElementById("status"),
};

const game = new Game(canvas, hud);

let last = performance.now();
function loop(now) {
  // Clamp delta so tab-switch pauses don't teleport entities through walls.
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  game.update(dt);
  game.draw();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
