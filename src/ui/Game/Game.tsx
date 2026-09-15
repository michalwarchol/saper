import { useState } from "react";
import plansze from "../../../assets/saper-plansze.json";

import { createBoard, toggleFlag, revealCell, type Board as TBoard, type Level as TLevel } from "../../logic/board";
import Board from "../Board";
import Menu from "../Menu";

const Game = () => {
  const [currentLevelId, setCurrentLevelId] = useState(plansze.levels[0].id);
  const [board, setBoard] = useState<TBoard>(createBoard(plansze.levels[0] as TLevel));
  const [remainedMines, setRemainedMines] = useState(board.cells.filter((cell) => cell.mine).length);

  const onSetLevel = (id: string) => {
    const newLevel = plansze.levels.find((level) => level.id === id);
    const newBoard = createBoard(newLevel as TLevel);
    setBoard(newBoard);
    // important: mineCount from json file is omitted
    setRemainedMines(newBoard.cells.filter((cell) => cell.mine).length);
    setCurrentLevelId(newLevel!.id!);
  }

  const onToggleFlag = (index: number) => {
    const newBoard = toggleFlag(board, index);
    const allMines = newBoard.cells.filter((cell) => cell.mine).length
    const flags = newBoard.cells.filter((cell) => cell.flagged).length;

    setBoard(newBoard);
    setRemainedMines(allMines - flags);
  }

  const onRevealCell = (index: number) => {
    setBoard(revealCell(board, index));
  }

  return (
    <div>
      <Menu
        currentLevelId={currentLevelId}
        levels={plansze.levels.map((level) => ({ id: level.id, name: level.name}))}
        onSetLevel={onSetLevel}
      />
      <div>Remained mines: {remainedMines}</div>
      <Board board={board} onToggleFlag={onToggleFlag} onRevealCell={onRevealCell} />
      {board.state === 'won' && <div>You won!</div>}
      {board.state === 'lost' && <div>You lost!</div>}
    </div>
  );
}

export default Game;
