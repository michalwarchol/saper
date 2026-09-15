import type { Cell as TCell } from "../../logic/board";

import styles from './Cell.module.scss';

type CellProps = TCell & {
  boardState: 'idle' | 'playing' | 'won' | 'lost';
  onToggleFlag: () => void;
  onRevealCell: () => void;
}

const Cell: React.FC<CellProps> = ({ adjacent, flagged, mine, revealed, boardState, onToggleFlag, onRevealCell }: CellProps) => {
  const isGameNotFinished = boardState === 'idle' || boardState === 'playing';
  return (
    <div
      className={styles.cell}
      onContextMenu={(e) => {
        e.preventDefault();
        onToggleFlag();
      }}
      onClick={() => onRevealCell()}
    >
      {revealed && isGameNotFinished && (<div className={styles.revealed}>
        {mine && (<span className={styles.mine}>💣</span>)}
      </div>)}

      {revealed && isGameNotFinished &&(<div className={styles.revealed}>
        {adjacent > 0 && !mine && (<span className={`${styles.adjacent} ${styles['color-' + adjacent]}`}>{adjacent}</span>)}
      </div>)}
      
      {!revealed && isGameNotFinished && (<div className={styles.unrevealed}>
        {flagged && (<span className={styles.flag}>🚩</span>)}
      </div>)}

      {boardState === 'won' && mine && (
        <div className={styles.revealed}>
          <span className={styles.mine}>🚩</span>
        </div>
      )}
      {boardState === 'lost' && mine && ( 
        <div className={styles.revealed}>
          <span className={styles.mine}>💣</span>
        </div>
      )}
    </div>
  )
}

export default Cell;
