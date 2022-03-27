// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, selectSquare}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function History({history, step, showStep}) {
  const stepSelectButtons = history.map((_, index) => {
    const isCurrentStep = step === index
    return (
      <li key={index}>
        <button
          disabled={isCurrentStep}
          onClick={() => {
            showStep(index)
          }}
        >
          {index ? `Go to move #${index}` : `Go to game start`}
          {isCurrentStep && ` (current)`}
        </button>
      </li>
    )
  })

  return <ol>{stepSelectButtons}</ol>
}

const initialBoard = Array(9).fill(null)

function Game() {
  // 🐨 squares is the state for this component. Add useState for squares
  // const [squares, setSquares] = React.useState(Array(9).fill(null))
  // Extra credit 1/2: save the current game state to local storage
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    initialBoard,
  ])
  const currentSquares = history[currentStep]
  // const [squares, setSquares] = React.useState(initialBoard)

  // 🐨 We'll need the following bits of derived state:
  // - nextValue ('X' or 'O')
  // - winner ('X', 'O', or null)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // 💰 I've written the calculations for you! So you can use my utilities
  // below to create these variables
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    //
    // 🦉 It's typically a bad idea to mutate or directly change state in React.
    // Doing so can lead to subtle bugs that can easily slip into production.
    //
    // 🐨 make a copy of the squares array
    // 💰 `[...squares]` will do it!)
    //
    // 🐨 set the value of the square that was selected
    // 💰 `squaresCopy[square] = nextValue`
    //
    // 🐨 set the squares to your copy
    if (winner || currentSquares[square] !== null) return

    const newSquares = [...currentSquares]
    newSquares[square] = nextValue
    // setSquares(newSquares)
    setCurrentStep(step => step + 1)
    setHistory([...history, newSquares])
  }

  function showStep(step) {
    setCurrentStep(step)
  }

  function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setCurrentStep(0)
    setHistory([initialBoard])
  }

  const isCurrentStep = currentStep === history.length - 1
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          selectSquare={isCurrentStep ? selectSquare : () => {}}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        {/* 🐨 put the status in the div below */}
        <div className="status">{status}</div>
        <History history={history} step={currentStep} showStep={showStep} />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
