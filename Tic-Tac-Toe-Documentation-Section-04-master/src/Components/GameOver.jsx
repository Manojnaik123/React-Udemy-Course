
export default function GameOver({winner, onClickHandler}){
    return <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} winner won</p>}
        {!winner && <p>It is a draw</p>}
        <p>
            <button onClick={onClickHandler}>Rematch!</button>
        </p>
    </div>
}