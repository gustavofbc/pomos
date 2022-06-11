import React, { useState } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(5);
  const [intervalId, setIntervalId] = useState(0);

  const handleClick = () => {
    if (intervalId) {
      clearInterval(intervalId);
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          console.log('acabou');
        }
      }
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setSeconds((prevCount) => prevCount - 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  return (
    <div>
      <h1 style={{ color: 'red' }}>
        {intervalId}:{seconds}
      </h1>
      <button onClick={handleClick}>
        {intervalId ? 'Stop counting' : 'Start counting'}
      </button>
    </div>
  );
};

export default Timer;
