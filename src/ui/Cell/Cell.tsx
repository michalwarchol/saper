import type { Cell as TCell } from "../../logic/board";

import styles from './Cell.module.scss';

type CellProps = TCell & {
  boardState: 'idle' | 'playing' | 'won' | 'lost';
  onToggleFlag: () => void;
  onRevealCell: () => void;
}

const Cell: React.FC<CellProps> = ({ adjacent, flagged, mine, revealed, boardState, onToggleFlag, onRevealCell }: CellProps) => {
  const isGameNotFinished = boardState === 'idle' || boardState === 'playing';
  const faceRevealed = `${styles['cell__face']} ${styles['cell__face--revealed']}`;
  const faceUnrevealed = `${styles['cell__face']} ${styles['cell__face--unrevealed']}`;
  return (
    <div
      className={styles.cell}
      onContextMenu={(e) => {
        e.preventDefault();
        onToggleFlag();
      }}
      onClick={() => onRevealCell()}
    >
      {revealed && isGameNotFinished && (<div className={faceRevealed}>
        {mine && (<span className={styles['cell__icon']}>💣</span>)}
      </div>)}

      {revealed && isGameNotFinished &&(<div className={faceRevealed}>
        {adjacent > 0 && !mine && (<span className={`${styles['cell__adjacent']} ${styles['cell__adjacent--' + adjacent]}`}>{adjacent}</span>)}
      </div>)}
      
      {!revealed && isGameNotFinished && (<div className={faceUnrevealed}>
        {flagged && (<span className={styles['cell__icon']}>🚩</span>)}
      </div>)}

      {boardState === 'won' && mine && (
        <div className={faceRevealed}>
          <span className={styles['cell__icon']}>🚩</span>
        </div>
      )}
      {boardState === 'lost' && mine && ( 
        <div className={faceRevealed}>
          <span className={styles['cell__icon']}>💣</span>
        </div>
      )}
    </div>
  )
}

export default Cell;
