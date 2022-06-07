import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(3);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const formatedSeconds = seconds === 60 ? '00' : seconds;
  const formatedMinutes = minutes < 10 ? '0' + minutes : minutes;

  function handleStart() {
    setIsActive(true);
    setIsPaused(false);
  }

  function handlePause() {
    setIsPaused(!isPaused);
  }

  function handleReset() {
    // setTime(0);
    setSeconds(59);
    setMinutes(25);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      setInterval(() => {
        if (seconds === 60) {
          setMinutes(minutes - 1);
        }
        // if (seconds === 1) {
        console.log(seconds);
        // setSeconds(60);
        // }
        setSeconds(seconds - 1);
        // setMinutes(25);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  return (
    <div>
      <div className="timer">
        {/* <span className="digits">{('0' + Math.floor(time)).slice(-2)}:</span> */}
        <span className="digits">
          {formatedMinutes}:{formatedSeconds}.
        </span>
      </div>

      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;
