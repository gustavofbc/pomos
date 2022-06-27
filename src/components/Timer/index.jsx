import React, { useEffect, useState } from 'react';
import Play from '../../assets/play.svg';
import Pause from '../../assets/pause.svg';

import soundAlert from '../../assets/alert.mp3';

import './style.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const [counterPomodoros, setCounterPomodoros] = useState(0);
  const [cicle, setCicle] = useState('pomodoro');
  const [intervalTimer, setIntervalTimer] = useState(0);

  const CICLE_TYPES = {
    pomodoro: {
      text: 'Pomodoro',
      className: 'pomodoro-active',
      color: 'red',
      minutes: 25,
      seconds: 0,
    },
    shortBreak: {
      text: 'Short break',
      className: 'short-break-active',
      color: 'blue',
      minutes: 5,
      seconds: 0,
    },
    longBreak: {
      text: 'Long break',
      className: 'long-break-active',
      color: 'purple',
      minutes: 15,
      seconds: 0,
    },
  };

  function incrementCounter() {
    setCounterPomodoros(counterPomodoros + 1);
  }

  function verifyCicle(cicle) {
    if (cicle === 'pomodoro') {
      initCicle('shortBreak');
    } else {
      initCicle('pomodoro');
    }
  }

  useEffect(() => {
    initPomos();

    setIntervalTimer(
      setInterval(() => {
        if (isActive && isPaused === false) {
          clearInterval(intervalTimer);
          if (seconds === 0) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes(minutes - 1);
            } else {
              //após completar os 3 pomodoros completos
              if (counterPomodoros === 6) {
                initCicle('longBreak');
                // alerta a conclusão de um pomodoro
                alertSound();
                setCounterPomodoros(-1);
              } else if (counterPomodoros < 6) {
                verifyCicle(cicle);

                // alerta a conclusão de um pomodoro
                alertSound();
              } else {
                // alerta a conclusão de um pomodoro
                alertSound();

                // retorna ao ciclo inicial
                initCicle('pomodoro');
              }
            }
          } else {
            setSeconds(seconds - 1);
          }
        }
        clearInterval(intervalTimer);
      }, 1000),
    );
    clearInterval(intervalTimer);
  }, [isActive, isPaused, seconds, counterPomodoros]);

  const timerMinutes = String(minutes).padStart(2, '0');
  const timerSeconds = String(seconds).padStart(2, '0');

  function handleStart() {
    setIsActive(true);
    setIsPaused(false);
    toggleColor('active');
  }

  function handlePause() {
    clearInterval(intervalTimer);
    setIsPaused(!isPaused);
    toggleColor('paused');
  }

  function handleResume() {
    clearInterval(intervalTimer);
    setIsPaused(!isPaused);
    toggleColor('active');
  }

  function toggleColor(classe) {
    document.getElementById('circle').removeAttribute('class');
    document.getElementById('circle').setAttribute('class', classe);
  }

  function alertSound() {
    incrementCounter();
    document.getElementById('audio').play();
    setTimeout(() => {
      alert('Ciclo concluído!');
    }, 100);
  }

  function initCicle(type) {
    const { text, className, color, minutes, seconds } = CICLE_TYPES[type];

    const elemento = document.getElementById('cicle-text');
    if (elemento) {
      elemento.innerText = text;
      elemento.style = `color: var(--${color})`;
    }

    setCicle(type);
    toggleColor(className);
    setIsActive(false);
    setIsPaused(true);
    setMinutes(minutes);
    setSeconds(seconds);
    setCounterPomodoros(0);
  }

  function initPomos() {
    setTimeout(() => {
      const elemento = document.querySelector('.circle');
      if (elemento) {
        initCicle('pomodoro');
      }
    }, 3000);
  }

  return (
    <section>
      <div className="container-controls">
        <button
          onClick={() => initCicle('pomodoro')}
          className="function pomodoro-button"
        >
          Pomodoro
        </button>
        <button
          onClick={() => initCicle('shortBreak')}
          className="function short-break-button"
        >
          Short break
        </button>
        <button
          onClick={() => initCicle('longBreak')}
          className="function long-break-button"
        >
          Long break
        </button>
      </div>

      <div className="timer-container">
        <div className="circle" id="circle">
          <div className="timer">
            <audio src={soundAlert} id="audio"></audio>
            {timerMinutes}
            <span>:</span>
            {timerSeconds}
          </div>

          {!isActive && (
            <button className="button-action" onClick={handleStart}>
              Iniciar
            </button>
          )}
          {isPaused === false && (
            <button className="button-action" onClick={handlePause}>
              <img src={Pause} alt="pausar" />
            </button>
          )}

          {isPaused === true && isActive === true ? (
            <button className="button-action" onClick={handleResume}>
              <img src={Play} alt="retomar" />
            </button>
          ) : (
            ''
          )}
        </div>

        <h2 id="cicle-text" style={{ color: 'var(--background-circle)' }}>
          Bem vindo ao pomos!
        </h2>
      </div>
    </section>
  );
};

export default Timer;
