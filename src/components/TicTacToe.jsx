import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const renderSquare = (index) => (
    <button
      className={`square ${winner?.combination?.includes(index) ? "winning-square" : ""}`}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  const checkWinner = (newBoard) => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of combinations) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return { player: newBoard[a], combination: [a, b, c] };
      }
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else if (!newBoard.includes(null)) {
      setWinner({ player: "No Winner", combination: [] });
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {[0, 1, 2].map(i => (
          <div key={i} className="board-row">
            {renderSquare(i * 3)}
            {renderSquare(i * 3 + 1)}
            {renderSquare(i * 3 + 2)}
          </div>
        ))}
      </div>
      {winner && (
        <div className={`winner-announcement ${winner.player === "No Winner" ? "no-winner" : ""}`}>
          {winner.player === "No Winner" ? "Oops! It's a Draw!" : `${winner.player} is the Winner!`}
        </div>
      )}
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
