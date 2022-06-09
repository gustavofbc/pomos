import React, { useEffect, useState } from 'react';
import Play from '../../assets/play.svg';
import Pause from '../../assets/pause.svg';

import soundAlert from '../../assets/alert.mp3';

import './style.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  // const [message, setMessage] = useState(false);

  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      if (isActive && isPaused === false) {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            // alerta a conclusão de um pomodoro
            alertSound();

            // retorna aos valores iniciais
            setIsActive(false);
            setIsPaused(true);
            setMinutes(25);
            setSeconds(0);
            toggleColorInitial();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);
  }, [isActive, isPaused, seconds]);

  function toggleColorInitial() {
    document.querySelector('.circle').classList.remove('active', 'paused');
  }

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  function handleStart() {
    setIsActive(true);
    setIsPaused(false);
    toggleColorStart();
  }

  function toggleColorStart() {
    document.querySelector('.circle').classList.toggle('active');
  }

  function handlePause() {
    setIsPaused(!isPaused);
    toggleColorPause();
  }

  function toggleColorPause() {
    document.querySelector('.circle').classList.toggle('paused');
  }

  function alertSound() {
    document.getElementById('audio').play();
    setTimeout(() => {
      alert('Pomodoro concluído!');
    }, 100);
  }

  return (
    <section className="circle">
      <div className="timer">
        <audio src={soundAlert} id="audio"></audio>
        {timerMinutes}
        <span>:</span>
        {timerSeconds}
      </div>
      {!isActive && (
        <button onClick={handleStart}>
          Iniciar
          {/* <img src={Play} alt="iniciar" /> */}
        </button>
      )}
      {isPaused === false && (
        <button onClick={handlePause}>
          <img src={Pause} alt="pausar" />
        </button>
      )}

      {isPaused === true && isActive === true ? (
        <button onClick={handlePause}>
          <img src={Play} alt="retomar" />
        </button>
      ) : (
        ''
      )}
    </section>
  );
};

export default Timer;
