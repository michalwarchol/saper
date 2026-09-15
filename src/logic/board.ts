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

function checkWin(board: Board): boolean {
  const allMines = board.cells.filter((cell) => cell.mine).length
  const revealedCount = board.cells.filter((cell) => cell.revealed).length;

  return board.width * board.height === revealedCount + allMines;
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

  const board = {
    width: level.width,
    height: level.height,
    cells: cells,
    state: 'idle' as 'idle' | 'playing' | 'won' | 'lost',
  };

  if (checkWin(board)) {
    board.state = 'won';
  }

  return board;
}

const isIndexFlagged = (cell: Cell): boolean => {
  return cell && cell.flagged;
}

const chordingReveal = (board: Board, index: number) => {
  if (!board.cells[index]) {
    return;
  }

  if (board.cells[index].revealed) {
    return;
  }

  if (board.cells[index].flagged) {
    return;
  }

  if (board.cells[index].mine) {
    board.cells[index].revealed = true;
    board.state = 'lost';

    return;
  }

  if (board.cells[index].adjacent > 0) {
    board.cells[index].revealed = true;
    return;
  }

  if (board.cells[index].adjacent === 0) {
    board.cells[index].revealed = true;
    cascadeReveal(board, index);
  }
}

function chording(board: Board, index: number) {
  const indexesToCheck = [
    index - board.width,
    index + board.width,
  ];

  // left edge column
  if (index % board.width !== 0) {
    indexesToCheck.push(index - board.width - 1, index - 1, index + board.width - 1);
  }
  
  // right edge column
  if (index % board.width !== board.width - 1) {
    indexesToCheck.push(index - board.width + 1, index + 1, index + board.width + 1);
  }

  const flaggedIndexes = indexesToCheck.filter((indexToCheck) => isIndexFlagged(board.cells[indexToCheck])).length;
  const revealedCell = board.cells[index];
  if (revealedCell.adjacent === flaggedIndexes) {
    indexesToCheck.forEach((indexToCheck) => {
      chordingReveal(board, indexToCheck);
    });
  }
}

function cascadeReveal(board: Board, index: number): void {
  const indexesToCheck = [
    index - board.width,
    index + board.width,
  ];

  // left edge column
  if (index % board.width !== 0) {
    indexesToCheck.push(index - board.width - 1, index - 1, index + board.width - 1);
  }
  
  // right edge column
  if (index % board.width !== board.width - 1) {
    indexesToCheck.push(index - board.width + 1, index + 1, index + board.width + 1);
  }

  indexesToCheck.forEach((indexToCheck) => {
    if (!board.cells[indexToCheck]) {
      return;
    }

    if (board.cells[indexToCheck].mine) {
      return;
    }

    if (board.cells[indexToCheck].flagged) {
      return;
    }

    if (!board.cells[indexToCheck].revealed && board.cells[indexToCheck].adjacent > 0) {
      board.cells[indexToCheck].revealed = true;
    }

    if (!board.cells[indexToCheck].revealed && board.cells[indexToCheck].adjacent === 0) {
      board.cells[indexToCheck].revealed = true;
      cascadeReveal(board, indexToCheck);
    }
  });
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
    if (checkWin(newBoard)) {
      newBoard.state = 'won';
    }
    return newBoard;
  }

  if (!revealedCell.revealed && revealedCell.adjacent === 0) {
    newBoard.cells[index].revealed = true;
    cascadeReveal(newBoard, index);

    if (checkWin(newBoard)) {
      newBoard.state = 'won';
    }

    return newBoard;
  }

  if (revealedCell.revealed && revealedCell.adjacent > 0) {
    chording(newBoard, index);

    if (checkWin(newBoard)) {
      newBoard.state = 'won';
    }

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
