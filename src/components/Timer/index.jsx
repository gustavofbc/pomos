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

  let interval;
  let counter = 0;

  function incrementCounter(value) {
    setCounterPomodoros(value);
  }

  function verifyCicle(cicle) {
    if (cicle === 'pomodoro') {
      initCicle(
        'short break',
        'Short break',
        'short-break-active',
        'blue',
        5,
        0,
      );
    }
    if (cicle === 'short break' || cicle === 'long break') {
      initCicle('pomodoro', 'Pomodoro', 'pomodoro-active', 'red', 25, 0);
    }
  }

  useEffect(() => {
    initPomos();

    interval = setInterval(() => {
      if (isActive && isPaused === false) {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            //após completar os 3 pomodoros completos
            if (counterPomodoros === 6) {
              initCicle(
                'long break',
                'Long break',
                'long-break-active',
                'purpure',
                15,
                0,
              );
              // alerta a conclusão de um pomodoro
              alertSound(counter);
              setCounterPomodoros(-1);
            } else if (counterPomodoros < 6) {
              //contador de ciclos de pomodoro
              counter = counterPomodoros + 1;
              incrementCounter(counter);

              verifyCicle(cicle);

              // alerta a conclusão de um pomodoro
              alertSound(counter);
            } else {
              //contador de ciclos de pomodoro
              counter = counterPomodoros + 1;
              incrementCounter(counter);

              // alerta a conclusão de um pomodoro
              alertSound(counter);

              // retorna aos valores iniciais
              initCicle(
                'pomodoro',
                'Pomodoro',
                'pomodoro-active',
                'red',
                25,
                0,
              );
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }
      clearInterval(interval);
    }, 1000);
  }, [isActive, isPaused, seconds, counterPomodoros]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  function handleStart() {
    setIsActive(true);
    setIsPaused(false);
    toggleColor('active');
  }

  function handlePause() {
    clearInterval(interval);
    setIsPaused(!isPaused);
    toggleColor('paused');
  }

  function handleResume() {
    clearInterval(interval);
    setIsPaused(!isPaused);
    toggleColor('active');
  }

  function toggleColor(classe) {
    document.getElementById('circle').removeAttribute('class');
    document.getElementById('circle').setAttribute('class', classe);
  }

  function alertSound(counter) {
    setCounterPomodoros(counter++);
    document.getElementById('audio').play();
    setTimeout(() => {
      alert('Ciclo concluído!');
    }, 100);
  }

  function initCicle(
    cicle,
    textCicle,
    classCicleActive,
    color,
    minutes,
    seconds,
  ) {
    clearInterval(interval);

    const elemento = document.getElementById('cicle');
    if (elemento) {
      elemento.innerText = textCicle;
      elemento.style = `color: var(--${color})`;
    }

    setCicle(cicle);
    toggleColor(classCicleActive);
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
        initCicle('pomodoro', 'Pomodoro', 'pomodoro-active', 'red', 25, 0);
      }
    }, 3000);
  }

  return (
    <section>
      <div className="container-controls">
        <button
          onClick={() =>
            initCicle('pomodoro', 'Pomodoro', 'pomodoro-active', 'red', 25, 0)
          }
          className="function pomodoro-button"
        >
          Pomodoro
        </button>
        <button
          onClick={() =>
            initCicle(
              'short break',
              'Short break',
              'short-break-active',
              'blue',
              5,
              0,
            )
          }
          className="function short-break-button"
        >
          Short break
        </button>
        <button
          onClick={() =>
            initCicle(
              'long break',
              'Long break',
              'long-break-active',
              'purpure',
              15,
              0,
            )
          }
          className="function long-break-button"
        >
          Long break
        </button>
      </div>
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
      <h2
        id="cicle"
        className="cicle"
        style={{ color: 'var(--background-circle)' }}
      >
        Bem vindo ao pomos!
      </h2>
    </section>
  );
};

export default Timer;
