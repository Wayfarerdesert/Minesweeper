import { useState, useEffect } from "react";

export default function GameControls({ gameOver, timerStarted, startTimer, resetGame, setMineCount }) {
    const [minesInput, setMinesInput] = useState("");

    useEffect(() => {
        if (gameOver) {
            setMinesInput("");
        }
    }, [gameOver]);

    const handleMineChange = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setMinesInput(value);
        }

        const number = parseInt(value, 10);
        if (!isNaN(number) && number >= 1 && number <= 99) {
            setMineCount(number);
        }
    }


    return (
        <div className="d-flex flex-column align-items-center">
            <input
                type="text"
                className="form-control mt-2"
                placeholder="Number of Mines (1–99)"
                value={minesInput}
                onChange={handleMineChange}
                min={1}
                max={99}
            />

            <button
                className="btn btn-outline-secondary mt-2"
                onClick={gameOver ? resetGame : startTimer}
                disabled={parseInt(minesInput) < 1 || parseInt(minesInput) > 99}
            >
                {gameOver ? "RESTART" : timerStarted ? "STOP" : "START"}
            </button>
        </div>
    );
}