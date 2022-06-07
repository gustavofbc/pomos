import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          let minutes = message ? 24 : 0;
          let seconds = 2;
          setSeconds(seconds);
          setMinutes(minutes);
          setMessage(!message);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
  }, [seconds]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div>
      {message && <div>Acabou</div>}
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
    </div>
  );
};

export default Timer;
