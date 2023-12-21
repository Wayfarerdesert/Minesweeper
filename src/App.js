import { useState } from 'react';
import './App.css';
import Cell from './Cell';
import Time from './Time';

function App() {
  // Game Calls Values
  const values = [
    '1', '0', '*', '1', '0',
    '*', '1', '0', '1', '2',
    '1', '0', '*', '2', '0',
    '*', '1', '0', '1', '0',
    '1', '2', '*', '1', '2'
  ]

  // Define cells componets values
  const [valueMap, setValueMap] = useState(Array(25).fill(" "));
  const cell = valueMap.map((item, index) =>
    <div className='col-auto p-0' key={index}><Cell value={item} onCellClick={() => showValue(index)} /></div>
  );

  // console.log("----- CARGAMOS APP")

  // Timer Starter
  const [timerStarted, setTimerStarter] = useState(false);

  // Function response START btn
  const btnStart = () => {
    setValueMap(Array(25).fill(" "));
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
    <div className="container text-center" style={{ width: 340 }}>
      <div className="grid bg-body-secondary py-2 px-4 borderOutSide m-0">
        <div className="row bg-body-secondary borderInside ">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="lcdText text-danger pe-2 m-2 borderInsideS">10</div>
            <div className="align-self-center m-2 borderInsideS">
              <img src="acierto.png" style={{ width: 50 }} />
            </div>
            <Time timerStarted={timerStarted}/>
          </div>
        </div>
        <div className="row borderInside bg-body-secondary text-center justify-content-center">
          <div className="col my-1 p-0">
            <div className="d-flex flex-wrap justify-content-center">
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
