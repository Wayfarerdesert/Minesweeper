import { useState, useEffect } from 'react';
import './App.css';
import CreateBoard from './components/Board';
import Cell from './components/Cell';
import Time from './components/Time';

function App() {
  const [timerStarted, setTimerStarter] = useState(false);
  const [board, setBoard] = useState([]);

  const BOARD_SIZE = 10;
  const NUMBER_OF_MINES = 8;

  // Function to handle cell click (left-click)
  // This function can be used to reveal the cell or perform any action
  const handleClick = (row, col) => {
    console.log(`Cell clicked at row: ${row}, col: ${col}`);
  }

  // Function to handle cell marking (right-click)
  // This function can be used to toggle flags or marks on the cell
  const handleMark = (row, col) => {
    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.status === "hidden") {
      cell.status = "marked";
    } else if (cell.status === "marked") {
      cell.status = "hidden";
    }

    setBoard(newBoard);
    console.log("Marked cell:", cell);
  }

  const ListMinesLeft = () => {
    const minesLeft = board.reduce((count, row) => {
      return count + row.filter(cell => cell.status === "marked").length;
    }, 0);

    return NUMBER_OF_MINES - minesLeft;
  }

  // Function response START btn
  const startTimer = () => {
    // setValueMap(Array(100).fill(" "));
    setTimerStarter(true);
  };

  useEffect(() => {
    // Initialize the board when the component mounts
    const initialBoard = CreateBoard(BOARD_SIZE, NUMBER_OF_MINES);
    setBoard(initialBoard);
  }, []);


  // console.log("Board:", board);

  return (
    <div className="container text-center" style={{ width: 600 }}>
      <div className="grid bg-body-secondary py-2 px-4 borderOutSide m-0">
        <div className="row bg-body-secondary borderInside">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="lcdText text-danger pe-2 m-2 borderInsideS" style={{ width: 94 }}>{ListMinesLeft()}</div>
            <div className="align-self-center m-2 borderInsideS">
              <img src="success.png" style={{ width: 50 }} alt="Icon" />
            </div>
            <Time timerStarted={timerStarted} />
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
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button className='btn btn-outline-secondary mt-2' onClick={startTimer}>START</button>
      </div>
    </div>
  );
}

export default App;
