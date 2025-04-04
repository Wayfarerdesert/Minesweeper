import { useState, useEffect } from "react";

export default function Time({ timerStarted }) {
    const [seconds, setSeconds] = useState(0);


    useEffect(() => {
        // Start timer
        let interval;

        if (timerStarted) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        // End Timer
        return () => {
            clearInterval(interval);
        };
    }, [timerStarted]);

    return (
        <div className="lcdText text-danger pe-2 m-2 borderInsideS" style={{ width: 94 }}>{seconds}</div>
    );
};