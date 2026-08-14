import { RAW_MAZE, COLS, ROWS, TILE } from "./maze.js";

const WALL = "#";

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const wrapC = (c) => (c < 0 ? COLS - 1 : c >= COLS ? 0 : c);

/**
 * A grid-based Pac-Man game rendered on a 2D canvas.
 * Entities move cell-to-cell with smooth interpolation and only change
 * direction when centered on a tile (classic Pac-Man turning behavior).
 */
export class Game {
  constructor(canvas, hud) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.hud = hud;
    this.reset(true);
    this.bindInput();
  }

  reset(fullReset) {
    this.walls = RAW_MAZE.map((row) => [...row].map((ch) => ch === WALL));
    if (fullReset) {
      this.dots = RAW_MAZE.map((row) =>
        [...row].map((ch) => (ch === "." ? 1 : ch === "o" ? 2 : 0)),
      );
      this.dotsLeft = this.dots.flat().filter((d) => d > 0).length;
      this.score = 0;
      this.lives = 3;
    }

    const spawns = { pac: null, ghosts: [] };
    RAW_MAZE.forEach((row, r) => {
      [...row].forEach((ch, c) => {
        if (ch === "P") spawns.pac = { c, r };
        if (ch === "G") spawns.ghosts.push({ c, r });
      });
    });

    this.pac = this.makeEntity(spawns.pac, "left", 7);
    const colors = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb852"];
    this.ghosts = spawns.ghosts.map((s, i) =>
      Object.assign(this.makeEntity(s, "up", 6), {
        color: colors[i % colors.length],
        home: { ...s },
      }),
    );

    this.frightenedTimer = 0;
    this.gameOver = false;
    this.won = false;
    this.mouth = 0;
  }

  makeEntity(tile, dir, speed) {
    return { c: tile.c, r: tile.r, dir, nextDir: dir, frac: 0, speed, moving: true };
  }

  bindInput() {
    const map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right",
    };
    this.keyHandler = (e) => {
      const dir = map[e.key];
      if (dir) {
        this.pac.nextDir = dir;
        e.preventDefault();
      }
      if ((this.gameOver || this.won) && (e.key === "Enter" || e.key === " ")) {
        this.reset(true);
      }
    };
    window.addEventListener("keydown", this.keyHandler);
  }

  isWall(c, r) {
    if (r < 0 || r >= ROWS) return true;
    return this.walls[r][wrapC(c)];
  }

  canGo(entity, dir) {
    const d = DIRS[dir];
    return !this.isWall(entity.c + d.x, entity.r + d.y);
  }

  advance(entity, dt, chooseDir) {
    if (entity.frac === 0) {
      chooseDir(entity);
      if (!entity.dir || !this.canGo(entity, entity.dir)) {
        entity.moving = false;
        return;
      }
      entity.moving = true;
    }
    if (!entity.moving) return;

    entity.frac += entity.speed * dt;
    while (entity.frac >= 1) {
      entity.frac -= 1;
      const d = DIRS[entity.dir];
      entity.c = wrapC(entity.c + d.x);
      entity.r += d.y;
      chooseDir(entity);
      if (!entity.dir || !this.canGo(entity, entity.dir)) {
        entity.frac = 0;
        entity.moving = false;
        break;
      }
    }
  }

  pixelPos(entity) {
    const base = { x: entity.c * TILE + TILE / 2, y: entity.r * TILE + TILE / 2 };
    if (!entity.moving || entity.frac === 0) return base;
    const d = DIRS[entity.dir];
    return { x: base.x + d.x * entity.frac * TILE, y: base.y + d.y * entity.frac * TILE };
  }

  update(dt) {
    if (this.gameOver || this.won) return;
    this.mouth = (this.mouth + dt * 10) % (Math.PI * 2);

    this.advance(this.pac, dt, (e) => {
      if (e.nextDir !== e.dir && this.canGo(e, e.nextDir)) e.dir = e.nextDir;
      if (!this.canGo(e, e.dir)) e.dir = null;
    });

    // Eat dots at Pac-Man's current tile.
    const val = this.dots[this.pac.r][this.pac.c];
    if (val > 0) {
      this.dots[this.pac.r][this.pac.c] = 0;
      this.dotsLeft -= 1;
      this.score += val === 2 ? 50 : 10;
      if (val === 2) this.frightenedTimer = 7;
      if (this.dotsLeft === 0) this.won = true;
    }

    if (this.frightenedTimer > 0) this.frightenedTimer = Math.max(0, this.frightenedTimer - dt);
    const frightened = this.frightenedTimer > 0;

    for (const g of this.ghosts) {
      g.speed = frightened ? 4 : 6;
      this.advance(g, dt, (e) => this.chooseGhostDir(e, frightened));
    }

    this.checkCollisions(frightened);
    this.updateHud();
  }

  chooseGhostDir(g, frightened) {
    const opts = Object.keys(DIRS).filter((dir) => {
      const d = DIRS[dir];
      const rev = DIRS[g.dir];
      const isReverse = rev && d.x === -rev.x && d.y === -rev.y;
      return this.canGo(g, dir) && !isReverse;
    });
    const choices = opts.length ? opts : Object.keys(DIRS).filter((dir) => this.canGo(g, dir));
    if (!choices.length) {
      g.dir = null;
      return;
    }
    // 25% random wandering, otherwise chase/flee Pac-Man.
    if (Math.random() < 0.25) {
      g.dir = choices[Math.floor(Math.random() * choices.length)];
      return;
    }
    let best = choices[0];
    let bestScore = frightened ? -Infinity : Infinity;
    for (const dir of choices) {
      const d = DIRS[dir];
      const nc = wrapC(g.c + d.x);
      const nr = g.r + d.y;
      const dist = Math.hypot(nc - this.pac.c, nr - this.pac.r);
      if ((frightened && dist > bestScore) || (!frightened && dist < bestScore)) {
        bestScore = dist;
        best = dir;
      }
    }
    g.dir = best;
  }

  checkCollisions(frightened) {
    for (const g of this.ghosts) {
      if (g.c === this.pac.c && g.r === this.pac.r) {
        if (frightened) {
          this.score += 200;
          Object.assign(g, { c: g.home.c, r: g.home.r, frac: 0, dir: "up", nextDir: "up" });
        } else {
          this.loseLife();
          return;
        }
      }
    }
  }

  loseLife() {
    this.lives -= 1;
    if (this.lives <= 0) {
      this.gameOver = true;
    } else {
      this.reset(false);
    }
  }

  updateHud() {
    this.hud.score.textContent = this.score;
    this.hud.lives.textContent = this.lives;
    if (this.won) this.hud.status.textContent = "You win! Press Enter to play again.";
    else if (this.gameOver) this.hud.status.textContent = "Game over. Press Enter to restart.";
    else if (this.frightenedTimer > 0) this.hud.status.textContent = "Power up! Chase the ghosts!";
    else this.hud.status.textContent = "Use the arrow keys to move. Eat all the dots!";
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Walls.
    ctx.fillStyle = "#1a1aff";
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (this.walls[r][c]) {
          ctx.fillRect(c * TILE + 2, r * TILE + 2, TILE - 4, TILE - 4);
        }
      }
    }

    // Dots and power pellets.
    ctx.fillStyle = "#ffd6a5";
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const v = this.dots[r][c];
        if (v > 0) {
          ctx.beginPath();
          ctx.arc(c * TILE + TILE / 2, r * TILE + TILE / 2, v === 2 ? 5 : 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Ghosts.
    const frightened = this.frightenedTimer > 0;
    for (const g of this.ghosts) {
      const p = this.pixelPos(g);
      ctx.fillStyle = frightened ? "#2222ff" : g.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, TILE / 2 - 1, Math.PI, 0);
      ctx.lineTo(p.x + TILE / 2 - 1, p.y + TILE / 2 - 1);
      ctx.lineTo(p.x - TILE / 2 + 1, p.y + TILE / 2 - 1);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p.x - 3, p.y - 1, 2, 0, Math.PI * 2);
      ctx.arc(p.x + 3, p.y - 1, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pac-Man with animated mouth.
    const p = this.pixelPos(this.pac);
    const angles = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 };
    const facing = angles[this.pac.dir] ?? 0;
    const open = (Math.sin(this.mouth) + 1) / 2 * 0.35 + 0.05;
    ctx.fillStyle = "#ffe600";
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, TILE / 2, facing + open * Math.PI, facing - open * Math.PI + Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}
