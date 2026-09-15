import Cell from './ui/Cell';

function App() {
  return (
    <div>
      <Cell adjacent={1} flagged={true} mine={false} revealed={true} />
    </div>
  )
}

export default App
