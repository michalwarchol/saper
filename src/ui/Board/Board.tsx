import type { Board as TBoard } from '../../logic/board';

import Cell from '../Cell';

import styles from './Board.module.scss';

const createBoardUI = (board: TBoard) => {
  const rows = []
  for (let y = 0; y < board.height; y++) {
    const row = [];
    for (let x = 0; x < board.width; x++) {
      row.push(<Cell
        key={y * board.width + x}
        mine={board.cells[y * board.width + x].mine}
        revealed={board.cells[y * board.width + x].revealed}
        flagged={board.cells[y * board.width + x].flagged}
        adjacent={board.cells[y * board.width + x].adjacent}
      />);
    }
    rows.push(<div key={y} className={styles.row}>{row}</div>);
  }

  return rows;
}

const Board = ({ board }: { board: TBoard }) => {
  return (
    <div className={styles.board}>
      {createBoardUI(board)}
    </div>
  );
}

export default Board;