import type { Board as TBoard } from '../../logic/board';

import Cell from '../Cell';

import styles from './Board.module.scss';

const createBoardUI = (board: TBoard, onToggleFlag: (index: number) => void, onRevealCell: (index: number) => void) => {
  const rows = []
  for (let y = 0; y < board.height; y++) {
    const row = [];
    for (let x = 0; x < board.width; x++) {
      const index = y * board.width + x;
      row.push(<Cell
        key={index}
        mine={board.cells[index].mine}
        revealed={board.cells[index].revealed}
        flagged={board.cells[index].flagged}
        adjacent={board.cells[index].adjacent}
        onToggleFlag={() =>onToggleFlag(index)}
        onRevealCell={() => onRevealCell(index)}
      />);
    }
    rows.push(<div key={y} className={styles.row}>{row}</div>);
  }

  return rows;
}

interface BoardProps {
  board: TBoard;
  onToggleFlag: (index: number) => void;
  onRevealCell: (index: number) => void;
}

const Board = ({ board, onToggleFlag, onRevealCell }: BoardProps) => {
  return (
    <div className={styles.board}>
      {createBoardUI(board, onToggleFlag, onRevealCell)}
    </div>
  );
}

export default Board;