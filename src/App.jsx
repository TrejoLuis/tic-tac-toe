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
  const [board, setBoard] = useState(() => {
    let localBoard = localStorage.getItem('board')
    if(localBoard) return JSON.parse(localBoard)
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    let localTurn = localStorage.getItem('turn')
    if(localTurn) return JSON.parse(localTurn)
    return TURNS.X
  })
  const [matchResult, setMatchResult] = useState(null)

  function updateBoard (index) {
    // Ignore painted cell
    if (board[index]) return
    // Ignore if there is a match result
    if (matchResult) return
    // Change Board
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Change turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // saveGame
    saveGame(newBoard, newTurn)

    // check for current result
    const currentResult = checkForMatchResult(newBoard, turn)
    if (currentResult){
    // Match Ended
    setMatchResult(currentResult)
    // delete localstorage data
    localStorage.removeItem('board')
    localStorage.removeItem('turn')
    } 

  }

  function checkForMatchResult (board, turn) {
    let result = null
    // check a winner
    WINNING_COMBINATIONS.forEach(comb => {
      if (comb.every(index => board[index] === turn)) { result = ['win', turn] }
    })
    // check if tie
    if (board.every(cell => cell != null) && !result) { result = ['tie'] }
    // return null
    return result
  }

  function restartGame () {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setMatchResult(null)
  }

  function saveGame(board, turn){
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('turn', JSON.stringify(turn))
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <button onClick={restartGame}>Restart Game</button>
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
      {
        matchResult && (
          <section className='match-result'>
          {matchResult[0] == 'tie'
            ? <h3>TIE</h3>
            : <>
            <h3>WINNER</h3>
            <p>{matchResult[1]}</p>
            </>
          }
          <button onClick={restartGame}>Restart game</button>
          </section>
        )
      }
    </>
  )
}

export default App
