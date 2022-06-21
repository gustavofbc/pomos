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

  function incrementCounter(value) {
    setCounterPomodoros(value);
  }

  function verifyCicle(cicle) {
    //   if (
    //     document.getElementById('circle').classList.contains('short-break-active')
    //   ) {
    //     initCicle('Pomodoro', 'pomodoro-active', 'red', 0, 2);
    //     return console.log('ta em short break');
    //   }
    //   if (
    //     document.getElementById('circle').classList.contains('pomodoro-active')
    //   ) {
    //     return console.log('ta em pomodoro');
    //   }
    //   if (
    //     document.getElementById('circle').classList.contains('long-break-active')
    //   ) {
    //     return console.log('ta em long break');
    //   }
    if (cicle === 'pomodoro') {
      initCicle(
        'short break',
        'Short break',
        'short-break-active',
        'blue',
        0,
        2,
      );
    }
    if (cicle === 'short break' || cicle === 'long break') {
      initCicle('pomodoro', 'Pomodoro', 'pomodoro-active', 'red', 0, 2);
    }
  }

  let counter = 0;
  useEffect(() => {
    interval = setInterval(() => {
      if (isActive && isPaused === false) {
        clearInterval(interval);
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            console.log(counterPomodoros);
            if (counterPomodoros === 6) {
              initCicle(
                'long break',
                'Long break',
                'long-break-active',
                'purpure',
                0,
                1,
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
              initCicle('pomodoro', 'Pomodoro', 'pomodoro-active', 'red', 0, 2);
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
    const elemento = document.getElementById('cicle');
    if (elemento) {
      elemento.innerText = 'Pomodoro';
      elemento.style = `color: var(--red)`;
    }

    const circleElement = document.getElementById('circle');
    if (circleElement) {
      circleElement.setAttribute('class', 'pomodoro-active');
    }
  }

  return (
    <section>
      <div className="container-controls">
        <button
          onClick={() =>
            initCicle('pomodoro', 'Pomodoro', 'pomodoro-active', 'red', 0, 2)
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
      {/* {setTimeout(initPomos, 3000)} */}
    </section>
  );
};

export default Timer;
