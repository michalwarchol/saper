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
  return {
    width: level.width,
    height: level.height,
    cells: [],
    state: 'idle',
  }
}
export function revealCell(board: Board, index: number): Board {
  return board;
}
export function toggleFlag(board: Board, index: number): Board {
  return board;
}
