# 2048

A browser puzzle built with vanilla JavaScript and SCSS. Combine matching tiles on a 4 × 4 board to reach 2048.

[Play demo](https://daniilbarilotti.github.io/2048_game/) · [Portfolio](https://daniilbarilotti.github.io/Portfolio/)

## Controls

Select **Start**, then use the arrow keys or swipe on the board in any of four directions. Short taps are ignored; scrolling is disabled only on the board. **Restart** resets the board and score. A new tile appears only after a move changes the board.

## Implementation

- The board is a two-dimensional array.
- A row transformation removes zeros, merges matching neighbours once and pads with zeros.
- Right movement reverses rows; vertical movement transforms columns.
- Each merged tile increases the score by its new value.
- Board comparison prevents spawning tiles after ineffective moves.
- Win and loss messages reflect the board state.

## Run locally

```bash
git clone https://github.com/DaniilBarilotti/2048_game.git
cd 2048_game
npm ci
npm start
```

Scripts: `npm run build`, `npm run lint`, `npm run test:only`. Run `npm run test:state` for the dependency-free state regression checks (key guards, tile merging, swipe directions, threshold and cancellation). The project uses the Mate Academy starter toolchain; these commands are available, but their success is not implied by this README.

## Scope and credits

Learning implementation of the existing 2048 game concept, not an original game invention. Starter scripts and the existing GPL-3.0 licence are retained. Keyboard and touch controls share the same movement logic. State persistence is a possible follow-up improvement.
