import { useState } from "react";



export default function GameBoard({ onSelectSquare, board }) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, columnIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }



    return <ol id="game-board">
        {board.map((row, rowIndex) =>
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) =>
                        <li key={columnIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, columnIndex)} disabled={playerSymbol != null}>{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
    </ol>

}