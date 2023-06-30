import { useState } from 'react'
import './App.css'
import { TURNS, WINNING_COMBINATIONS } from './constants.js'

function Cell ({ children, index, updateBoard }) {
  function handleClick () {
    updateBoard(index)
  }

  return (
    <div className='cell' onClick={handleClick}>
      {children}
    </div>
  )
}

function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  function updateBoard (index) {
    // Change Board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }


  return (
    <>
      <h1>Tic Tac Toe</h1>
      <section className='game-board'>
        {board.map((content, index) =>
          <Cell key={index} index={index} updateBoard={updateBoard}>
            {content}
          </Cell>
        )}
      </section>
      <section className='turns-container'>
        <div className={`turn-box${turn === TURNS.X ? ' selected' : ''}`}>
          {TURNS.X}
        </div>
        <div className={`turn-box${turn === TURNS.O ? ' selected' : ''}`}>
          {TURNS.O}
        </div>
      </section>
    </>
  )
}

export default App
