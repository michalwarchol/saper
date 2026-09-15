export type Level = {
  id: string
  name: string
  width: number
  height: number
  mineCount: number
  mines: [number, number][] // [x, y]
}

export type Cell = {
  mine: boolean
  revealed: boolean
  flagged: boolean
  adjacent: number // liczba min w 8 sąsiednich polach
}

export type Board = {
  width: number
  height: number
  cells: Cell[] // wiersz po wierszu; indeks pola = y * width + x
  state: 'idle' | 'playing' | 'won' | 'lost'
}
  
export function createBoard(level: Level): Board {
  const cells: Cell[] = [];
  for (let y = 0; y < level.height; y++) {
    for (let x = 0; x < level.width; x++) {
      const isMine = level.mines.some(mine => mine[0] === x && mine[1] === y);
      const adjecentMines = level.mines.filter((mine) => {
        if (mine[0] === x && mine[1] === y - 1) return true;
        if (mine[0] === x && mine[1] === y + 1) return true;
        if (mine[0] === x - 1 && mine[1] === y) return true;
        if (mine[0] === x + 1 && mine[1] === y) return true;
        if (mine[0] === x - 1 && mine[1] === y - 1) return true;
        if (mine[0] === x + 1 && mine[1] === y + 1) return true;
        if (mine[0] === x - 1 && mine[1] === y + 1) return true;
        if (mine[0] === x + 1 && mine[1] === y - 1) return true;
          return false;
        }).length;

      cells.push({
        mine: isMine,
        revealed: false,
        flagged: false,
        adjacent: adjecentMines,
      });
    }
  }

  return {
    width: level.width,
    height: level.height,
    cells,
    state: 'idle',
  }
}

export function revealCell(board: Board, index: number): Board {
  if (board.state === 'lost' || board.state === 'won') return board;

  const newBoard = structuredClone(board);
  if (board.state === 'idle') {
    newBoard.state = 'playing';
  }

  const revealedCell = board.cells[index];
  if (!revealedCell.revealed && revealedCell.flagged) {
    return newBoard;
  }

  if (!revealedCell.revealed && revealedCell.mine) {
    newBoard.cells[index].revealed = true;
    newBoard.state = 'lost';
    return newBoard;
  }

  if (!revealedCell.revealed && revealedCell.adjacent > 0) {
    newBoard.cells[index].revealed = true;
    // TODO
    // if (checkWin(newBoard)) {
    //   newBoard.state = 'won';
    // }
    return newBoard;
  }

  if (!revealedCell.revealed && revealedCell.adjacent === 0) {
    newBoard.cells[index].revealed = true;
    // TODO:cascadeReveal(newBoard, index);

    // TODO
    // if (checkWin(newBoard)) {
    //   newBoard.state = 'won';
    // }

    return newBoard;
  }

  if (revealedCell.revealed && revealedCell.adjacent > 0) {
    // TODO: chording(newBoard, index);

    // TODO
    // if (checkWin(newBoard)) {
    //   newBoard.state = 'won';
    // }

    return newBoard;
  }

  return newBoard;
}

export function toggleFlag(board: Board, index: number): Board {
  if (board.state === 'lost' || board.state === 'won') return board;

  if (board.cells[index].revealed) return board;

    const newBoard = structuredClone(board);
    newBoard.cells[index].flagged = !newBoard.cells[index].flagged;
    if (board.state === 'idle') {
      newBoard.state = 'playing';
    }
    return newBoard;
}
