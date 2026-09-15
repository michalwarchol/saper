import { describe, it, expect } from 'vitest';
import { createBoard, revealCell, toggleFlag, type Level } from './board';

describe('cascade reveal', () => {
  it('reveals cascade only in the region left of a wall of number cells', () => {
    // 5x3 board:
    // . 1 M 1 .
    // . 2 2 2 .
    // . 1 M 1 .
    const level: Level = {
      id: 'test-cascade',
      name: 'Cascade test',
      width: 5,
      height: 3,
      mineCount: 2,
      mines: [
        [2, 0],
        [2, 2],
      ],
    };

    const board = createBoard(level);
    const result = revealCell(board, 0); // (0, 0), adjacent === 0

    const revealedIndexes = result.cells
      .map((cell, index) => (cell.revealed ? index : -1))
      .filter((index) => index !== -1);

    expect(revealedIndexes.sort((a, b) => a - b)).toEqual([0, 1, 5, 6, 10, 11]);

    // the right side of the board (x = 3 and x = 4) stays unrevealed
    for (const index of [3, 4, 8, 9, 13, 14]) {
      expect(result.cells[index].revealed).toBe(false);
    }

    expect(result.state).toBe('playing');

    // the original board is not mutated (revealCell clones it)
    expect(board.cells[0].revealed).toBe(false);
  });
});

describe('win condition', () => {
  it('sets state to "won" once all non-mine cells are revealed', () => {
    // 2x2 board with a single mine at (1, 1) -> index 3
    const level: Level = {
      id: 'test-win',
      name: 'Win test',
      width: 2,
      height: 2,
      mineCount: 1,
      mines: [[1, 1]],
    };

    const board = createBoard(level);

    let result = revealCell(board, 0);
    expect(result.state).toBe('playing');

    result = revealCell(result, 1);
    expect(result.state).toBe('playing');

    result = revealCell(result, 2);
    expect(result.state).toBe('won');

    // the mine cell was never revealed, even though the game was won
    expect(result.cells[3].revealed).toBe(false);

    // further calls on a won board don't change it (early return)
    const afterWin = revealCell(result, 3);
    expect(afterWin).toBe(result);
  });
});

describe('flags', () => {
  it('protects a flagged cell from being revealed and can be toggled off', () => {
    // 2x2 board with a single mine at (1, 1) -> index 3
    const level: Level = {
      id: 'test-flags',
      name: 'Flag test',
      width: 2,
      height: 2,
      mineCount: 1,
      mines: [[1, 1]],
    };

    const board = createBoard(level);

    const flagged = toggleFlag(board, 3);
    expect(flagged.cells[3].flagged).toBe(true);
    expect(flagged.state).toBe('playing');
    // original board is unchanged
    expect(board.cells[3].flagged).toBe(false);

    // trying to reveal a flagged mine doesn't reveal it or end the game
    const afterReveal = revealCell(flagged, 3);
    expect(afterReveal.cells[3].revealed).toBe(false);
    expect(afterReveal.state).not.toBe('lost');

    // unflagging
    const unflagged = toggleFlag(afterReveal, 3);
    expect(unflagged.cells[3].flagged).toBe(false);

    // an already revealed cell cannot be flagged
    const revealed = revealCell(unflagged, 0);
    expect(revealed.cells[0].revealed).toBe(true);
    const stillUnflagged = toggleFlag(revealed, 0);
    expect(stillUnflagged).toBe(revealed);
  });
});
