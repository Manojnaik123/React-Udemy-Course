import Player from "./Components/Player";
import GameBoard from "./Components/GameBoard";
import { useState } from 'react';
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombinations";
import GameOver from "./Components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(innerArray=> [...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }

  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    //setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X"); // here state upade is done with the use of previous state so using arraw functions 
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns); // This replaces teh below code 

      // let currentPlayer = 'X';

      // if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      //   currentPlayer = 'O';
      // }

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ...prevTurns
      ]

      return updatedTurns;
    })
  }

  function handleRematch(){
    setGameTurns([]);
  }

  return <main>
    <div id="game-container" >
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
        <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
      </ol>
      {(winner||hasDraw) && <GameOver winner={winner} onClickHandler={handleRematch}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>
}
export default App
