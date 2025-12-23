import { useState } from "react";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function startNewGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <span onClick={() => jumpTo(move)}>{description}</span>
      </li>
    );
  });
  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <ol>{moves}</ol>
        <div className="game-info">
          <button
            onClick={() => jumpTo(currentMove - 1)}
            disabled={currentMove === 0}
          >
            Previous
          </button>
          <button
            onClick={() => jumpTo(currentMove + 1)}
            disabled={currentMove === history.length - 1}
          >
            Next
          </button>
          <button onClick={startNewGame}>New Game</button>
        </div>
      </div>
    </>
  );
};

export default Game;
