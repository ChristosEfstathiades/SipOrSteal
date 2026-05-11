import { useState } from 'react'
import './App.css'

const gameStates = [
"start",
"addPlayers"
]

function App() {
  const [gameState, setGameState] = useState<number>(0);

  return (
    <>
      <main className='sm:max-w-md max-w-sm mx-auto'>
        {gameState > 0 && <button onClick={() => setGameState(gameState => gameState - 1)}>back</button>}
        {gameStates[gameState] == "start" && <div>Select Mode</div>}
        {gameStates[gameState] == "addPlayers" && <div>Add players</div>}

        {gameState < gameStates.length-1 && <button className='' onClick={() => setGameState(gameState => gameState + 1)}>Next</button>}
      </main>

    </>
  )
}

export default App
