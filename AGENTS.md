# PACMAN

A browser-based Pac-Man game built with vanilla JavaScript and the HTML5
Canvas API, bundled and served with [Vite](https://vitejs.dev/).

## Project layout

- `index.html` – page shell and canvas element (Vite entry point).
- `src/main.js` – bootstraps the game and runs the `requestAnimationFrame` loop.
- `src/game.js` – the `Game` class: movement, ghost AI, scoring, collisions, rendering.
- `src/maze.js` – the maze grid (`RAW_MAZE`) plus `COLS`/`ROWS`/`TILE` constants.
- `src/style.css` – page styling.

## Commands

All standard commands live in `package.json` scripts:

- `npm run dev` – start the Vite dev server (default `http://localhost:5173/`).
- `npm run build` – production build to `dist/`.
- `npm run preview` – serve the production build locally.
- `npm run lint` – run ESLint (flat config in `eslint.config.js`).

## Cursor Cloud specific instructions

- Dependencies are plain npm packages; the startup update script runs `npm install`.
- Run the app in development with `npm run dev`. It is a static front-end (no
  backend, database, or environment variables required).
- The dev server binds to localhost only. To reach it from another host, start
  it with `npm run dev -- --host`.
- The game only starts advancing after the first arrow-key press, and the
  canvas must have focus, so a manual/automated test must click the canvas and
  then press an arrow key before Pac-Man moves or the score changes.
- Ghost AI note: ghosts begin in a `state: "exit"` and steer toward a fixed
  corridor tile above the ghost house before switching to chase. This scripted
  exit is required because the greedy chase alone leaves them trapped in the
  house (Pac-Man is usually below it and the only exit is upward). If you change
  the maze around the ghost house (`src/maze.js`) or the `exitCols`/exit tile in
  `src/game.js`, re-verify that ghosts can still leave the house.
