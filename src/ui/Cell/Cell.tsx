import type { Cell as TCell } from "../../logic/board";

import styles from './Cell.module.scss';

const Cell: React.FC<TCell> = ({ adjacent, flagged, mine, revealed}: TCell) => {
  return (
    <div className={styles.cell}>
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
