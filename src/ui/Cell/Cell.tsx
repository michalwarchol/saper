import type { Cell as TCell } from "../../logic/board";

import styles from './Cell.module.scss';

type CellProps = TCell & {
  onToggleFlag: () => void;
  onRevealCell: () => void;
}

const Cell: React.FC<CellProps> = ({ adjacent, flagged, mine, revealed, onToggleFlag, onRevealCell }: CellProps) => {
  return (
    <div
      className={styles.cell}
      onContextMenu={(e) => {
        e.preventDefault();
        onToggleFlag();
      }}
      onClick={() => onRevealCell()}
    >
      {revealed && (<div className={styles.revealed}>
        {adjacent > 0 && (<span className={`${styles.adjacent} ${styles['color-' + adjacent]}`}>{adjacent}</span>)}
        {mine && (<span className={styles.mine}>💣</span>)}
      </div>)}
      
      {!revealed && (<div className={styles.unrevealed}>
        {flagged && (<span className={styles.flag}>🚩</span>)}
      </div>)}
    </div>
  )
}

export default Cell;
