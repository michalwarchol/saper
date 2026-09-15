import { useState } from "react";
import plansze from "../../../assets/saper-plansze.json";

import { createBoard, toggleFlag, type Board as TBoard, type Level as TLevel } from "../../logic/board";
import Board from "../Board";
import MenuUI from "../Menu";

const Game = () => {
  const [board, setBoard] = useState<TBoard>(createBoard(plansze.levels[0] as TLevel));
  const [remainedMines, setRemainedMines] = useState(plansze.levels[0].mineCount);

  const onSetLevel = (id: string) => {
    const newLevel = plansze.levels.find((level) => level.id === id);
    setBoard(createBoard(newLevel as TLevel));
    setRemainedMines(newLevel!.mineCount!);
  }

  const onToggleFlag = (index: number) => {
    setBoard(toggleFlag(board, index));
  }

  return (
    <div>
      <MenuUI
        levels={plansze.levels.map((level) => ({ id: level.id, name: level.name}))}
        onSetLevel={onSetLevel}
      />
      <div>Remained mines: {remainedMines}</div>
      <Board board={board} onToggleFlag={onToggleFlag} />
    </div>
  );
}

export default Game;
