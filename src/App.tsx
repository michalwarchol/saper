import plansze from "../assets/saper-plansze.json"
import { createBoard, type Level } from "./logic/board"

import BoardUI from "./ui/Board"

function App() {
  return (
    <div>
      <BoardUI board={createBoard(plansze.levels[0] as Level)} />
    </div>
  )
}

export default App
