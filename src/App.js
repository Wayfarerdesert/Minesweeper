import { useState, useEffect, useRef } from 'react';
import './App.css';
import { CreateBoard, CheckWin, CheckLose } from './components/Board';
import Cell from './components/Cell';
import Time from './components/Time';
import GameControls from './components/GameControls';

function App() {
  const [board, setBoard] = useState([]);
  const [timerStarted, setTimerStarter] = useState(false);
  const [resetSignal, setResetSignal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [markedCells, setMarkedCells] = useState(false);

  const BOARD_SIZE = 10;
  const minesCount = useRef(10); // Default mine count
  const NUMBER_OF_MINES = minesCount;

  const initialBoard = () => {
    const board = CreateBoard(BOARD_SIZE, NUMBER_OF_MINES.current);
    setBoard(board);
  };


  const getAdjacentCells = (row, col, board) => {
    const tiles = [];

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        const newRow = row + xOffset;
        const newCol = col + yOffset;

        if (
          (xOffset !== 0 || yOffset !== 0) && // skip the current cell
          newRow >= 0 && newRow < board.length &&
          newCol >= 0 && newCol < board[0].length
        ) {
          tiles.push({ ...board[newRow][newCol], x: newRow, y: newCol });
        }
      }
    }
    return tiles;
  }


  // Function to handle cell click (left-click)
  // This function can be used to reveal the cell or perform any action
  const handleClick = (row, col) => {
    if (!timerStarted || gameOver) return; // Prevent clicks if the game is over

    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.status !== "hidden") {
      return; // Ignore clicks on revealed or marked cells
    }

    if (cell.mine) {
      cell.status = "mine";
      // alert("Game Over! You clicked on a mine.");
      // return
    } else { // If the cell is not a mine, reveal it
      const reveal = (row, col, board) => {
        const currentCell = board[row][col];
        if (currentCell.status !== "hidden") return;

        const adjacentCells = getAdjacentCells(row, col, board);
        const mineCount = adjacentCells.filter(adj => adj.mine).length;

        currentCell.status = "number";
        currentCell.value = mineCount > 0 ? mineCount : "";

        if (mineCount === 0) {
          adjacentCells.forEach(({ x, y }) => {
            reveal(x, y, board);
          });
        }
      };
      reveal(row, col, newBoard);
    }

    setBoard(newBoard);
    checkGameOver(newBoard);
  }


  // Function to handle cell marking (right-click)
  // This function can be used to toggle flags or marks on the cell
  const handleMark = (row, col) => {
    if (!timerStarted || gameOver) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.status === "hidden") {
      cell.status = "marked";
    } else if (cell.status === "marked") {
      cell.status = "hidden";
    }

    setMarkedCells(true);
    setBoard(newBoard);
    console.log("Marked cell:", cell);
  }


  const listMinesLeft = () => {
    const markedCount = board.reduce((count, row) => {
      return count + row.filter(cell => cell.status === "marked").length;
    }, 0);

    return Math.max(NUMBER_OF_MINES.current - markedCount, 0);
  };


  const gameStatus = () => {
    if (gameWon) {
      return (
        <div>
          <span className="text-success px-3">You Win!</span>
          <img src="trophy.png" style={{ width: 50 }} alt="Trophy" />
        </div>
      );
    }

    if (gameLost) {
      return (
        <div>
          <span className="text-danger px-3">Game Over!</span>
          <img src="bomb.png" style={{ width: 50 }} alt="bomb" />
        </div>
      );
    }

    if (markedCells) {
      return (
        <div>
          <img src="flag.png" style={{ width: 50 }} alt="Flag" />
        </div>
      );
    }

    else {
      return (
        <div>
          <img src="success.png" style={{ width: 50 }} alt="success" />
        </div>
      );
    }
  }


  const checkGameOver = (newBoard) => {
    const winGame = CheckWin(newBoard);
    const loseGame = CheckLose(newBoard);

    if (winGame || loseGame) {
      setTimerStarter(false);
      setGameOver(true);
    }

    if (winGame) {
      setGameWon(true);
      alert("You win!");
    }

    if (loseGame) {
      const revealedBoard = newBoard.map(row => {
        return row.map(cell => {
          if (cell.mine) {
            cell.status = "mine";
          }
          return cell;
        });
      }
      );

      setGameLost(true);
      setBoard(revealedBoard);
      alert("You lose!");
    }
  }


  // Function response START btn
  const startGame = () => {
    setTimerStarter(prev => !prev);
    initialBoard();
  };


  const resetGame = () => {
    initialBoard();
    setGameOver(false);
    setGameLost(false);
    setGameWon(false);
    setMarkedCells(false);
    setTimerStarter(false);
    NUMBER_OF_MINES.current = 10;
    setResetSignal(prev => !prev);
  }


  useEffect(() => {
    // Initialize the board when the component mounts
    // setBoard(initialBoard);
    initialBoard();
  }, []);


  return (
    <div className="container text-center" style={{ width: 600 }}>
      <div className="grid bg-body-secondary py-2 px-4 borderOutSide m-0">
        <div className="row bg-body-secondary borderInside">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="lcdText text-danger pe-2 m-2 borderInsideS" style={{ width: 94 }}>{listMinesLeft()}</div>
            <div className="align-self-center m-2 borderInsideS">
              {gameStatus()}
            </div>
            <Time timerStarted={timerStarted} reset={resetSignal} />
          </div>
        </div>

        <div className="board row borderInside bg-body-secondary text-center justify-content-center">
          <div className="col my-2 p-0">
            <div
              className="d-flex flex-wrap justify-content-center"
            >
              {/* Rendering the board */}
              {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((tile, colIndex) => (
                    <div key={colIndex} className="col-auto p-0">
                      {/* Pass data to the Cell component */}
                      <Cell
                        key={`${rowIndex}-${colIndex}`}
                        value={tile.value}
                        status={tile.status}
                        onCellClick={() => handleClick(rowIndex, colIndex)}
                        onMarkClick={() => handleMark(rowIndex, colIndex)}
                        gameOver={gameOver}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      <GameControls
        gameOver={gameOver}
        timerStarted={timerStarted}
        startTimer={startGame}
        resetGame={resetGame}
        setMineCount={(value) => (minesCount.current = value)}
      />

    </div>
  );
}

export default App;
