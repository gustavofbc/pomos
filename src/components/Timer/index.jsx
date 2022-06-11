import React, { useEffect, useState } from 'react';
import Play from '../../assets/play1.svg';
import Pause from '../../assets/pause1.svg';

import soundAlert from '../../assets/alert.mp3';

import './style.css';

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  // const [message, setMessage] = useState(false);

  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
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
      clearInterval(interval);
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
    document.querySelector('.circle').classList.remove('pomodoro-active');
    document.querySelector('.circle').classList.remove('short-break-active');
    document.querySelector('.circle').classList.remove('long-break-active');
  }

  function handlePause() {
    clearInterval(interval);
    setIsPaused(!isPaused);
    toggleColorPause();
  }

  function toggleColorPause() {
    document.querySelector('.circle').classList.toggle('paused');
  }

  function toggleColorPomodoro() {
    document.querySelector('.circle').classList.add('pomodoro-active');
    document.querySelector('.circle').classList.remove('short-break-active');
    document.querySelector('.circle').classList.remove('long-break-active');
  }

  function toggleColorShortBreak() {
    document.querySelector('.circle').classList.remove('pomodoro-active');
    document.querySelector('.circle').classList.add('short-break-active');
    document.querySelector('.circle').classList.remove('long-break-active');
  }

  function toggleColorLongBreak() {
    document.querySelector('.circle').classList.remove('pomodoro-active');
    document.querySelector('.circle').classList.remove('short-break-active');
    document.querySelector('.circle').classList.add('long-break-active');
  }

  function alertSound() {
    document.getElementById('audio').play();
    setTimeout(() => {
      alert('Ciclo concluído!');
    }, 100);
  }

  function handleStartPomodoro() {
    clearInterval(interval);
    document.getElementById('cicle').innerText = 'Pomodoro';
    document.getElementById('cicle').style = 'color: var(--red)';
    toggleColorPomodoro();
    setIsActive(false);
    setIsPaused(true);
    setMinutes(25);
    setSeconds(0);
  }

  function handleStartShortBreak() {
    clearInterval(interval);
    document.getElementById('cicle').innerText = 'Short Break';
    document.getElementById('cicle').style = 'color: var(--blue)';
    toggleColorShortBreak();
    setIsActive(false);
    setIsPaused(true);
    setMinutes(5);
    setSeconds(0);
  }

  function handleStartLongBreak() {
    clearInterval(interval);
    document.getElementById('cicle').innerText = 'Long Break';
    document.getElementById('cicle').style = 'color: var(--purpure)';
    toggleColorLongBreak();
    setMinutes(15);
    setSeconds(0);
  }

  return (
    <section>
      <div className="container-controls">
        <button
          onClick={handleStartPomodoro}
          className="function pomodoro-button"
        >
          Pomodoro
        </button>
        <button
          onClick={handleStartShortBreak}
          className="function short-break-button"
        >
          Short break
        </button>
        <button
          onClick={handleStartLongBreak}
          className="function long-break-button"
        >
          Long break
        </button>
      </div>

      <div className="circle">
        <div className="timer">
          <audio src={soundAlert} id="audio"></audio>
          {timerMinutes}
          <span>:</span>
          {timerSeconds}
        </div>

        {!isActive && (
          <button className="button-action" onClick={handleStart}>
            Iniciar
            {/* <img src={Play} alt="iniciar" /> */}
          </button>
        )}
        {isPaused === false && (
          <button className="button-action" onClick={handlePause}>
            <img src={Pause} alt="pausar" />
          </button>
        )}

        {isPaused === true && isActive === true ? (
          <button className="button-action" onClick={handlePause}>
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
