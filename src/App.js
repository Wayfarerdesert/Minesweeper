import { useState } from 'react';
import './App.css';
import Cell from './Cell';
import Time from './Time';

function App() {
  // Game Calls Values
  const values = [
    '1', '0', '*', '1', '0', '2', '*', '1', '0', '1',
    '*', '1', '0', '1', '2', '1', '0', '*', '2', '0',
    '*', '1', '0', '1', '0', '1', '2', '*', '1', '2',
    '3', '0', '*', '1', '0', '2', '*', '1', '0', '1',
    '*', '1', '0', '1', '2', '1', '0', '*', '2', '0',
    '*', '1', '0', '1', '0', '1', '2', '*', '13', '2',
    '1', '0', '*', '1', '0', '2', '*', '1', '0', '1',
    '*', '1', '0', '3', '2', '1', '0', '*', '2', '0',
    '*', '1', '0', '1', '0', '1', '2', '*', '1', '2',
    '1', '0', '*', '1', '0', '2', '*', '1', '0', '3'
  ];

  const colors = {
    //   cellColor = '#000000'
    '0': 'black',
    //   cellColor = '#0000ff';
    '1': 'blue',
    //   cellColor = '#008000';
    '2': 'green',
    //   cellColor = '#ff0000'
    '3': 'red'
  }

  // Define cells componets values
  const [valueMap, setValueMap] = useState(Array(100).fill(" "));

  const cell = valueMap.map((item, index) =>
    <div className='col-auto p-0' key={index}>
      <Cell key={index} value={item} onCellClick={() => showValue(index)} color={colors[item]} />
    </div>
  );

  // console.log("----- CARGAMOS APP")

  // Time Starter
  const [timerStarted, setTimerStarter] = useState(false);

  // Function response START btn
  const btnStart = () => {
    setValueMap(Array(100).fill(" "));
    setTimerStarter(true);
    // alert('START THE GAME!')
  }

  // Change cell value
  const showValue = (index) => {
    const newValue = valueMap.slice();
    newValue[index] = values[index];
    setValueMap(newValue);
    // console.log(value)
  }

  // const startTimer = () => {
  //   setTimerStarter(true);
  // };

  return (
    <div className="container text-center" style={{ width: 600 }}>
      <div className="grid bg-body-secondary py-2 px-4 borderOutSide m-0">
        <div className="row bg-body-secondary borderInside">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="lcdText text-danger pe-2 m-2 borderInsideS" style={{ width: 94 }}>10</div>
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
              {cell}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button className='btn btn-outline-secondary mt-2' onClick={btnStart}>START</button>
      </div>
    </div>
  );
}

export default App;
