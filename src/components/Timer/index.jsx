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

  // Não é uma boa ideia criar variáveis aqui, isso quebra o princício da imutabilidade do React;
  // Ou essas variáveis se tornam estados: [state, setState] = useState() ou tu move ela para algum escopo;
  let interval;
  let counter = 0;

  // Pela função ser incremental, acho que ela não precisa receber um valor, ela pode incrementar baseado no 
  // valor atual do counter;
  // ex: function incrementCounter() { setCounterPomodoros(counterPomodoros + 1); }
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
    // Teoricamente essa verificação nem precisa ser feita, já que caso não seja 'pomodoro', ele vai para as outas opções
    // basicamente um else.
    if (cicle === 'short break' || cicle === 'long break') {
      // baseado na sugestão que eu dei ali em baixo, tu chamaria essa função assim:
      // initCicle({ type: 'pomodoro', minutes: 25, seconds: 0 });
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
              // O contador é pra virar -1 mesmo?
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

  // Existe uma função da String chamada padStart, tu usa ela assim: `String(minutes).padStart(2, '0')`
  // E ela já adiciona o '0' no incio do número caso ele possua apenas 1 dígito. 
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
    // Toda vez que tu executa essa função tu precisa passar muita informação, é contra indicado criar funções com mais de 2 parâmetros;
    // Mas além disso, a maioria desses parâmetros são padrões, então não faz sentido tu ter que passar toda vez a mesma coisa.
    // Sugestão:
    /**
     * function initCicle({ type, minutes, seconds }) {}
     * 
     * Esse type pode ser: 'pomo', 'shotBreak' e 'longBreak';
     * Dessa forma tu já tem algumas coisas padrões para cada um desses tipos:
     * EX: 
     * const CICLE_TYPES = {
     *  pomodoro: {
     *    text: 'Pomodoro',
     *    className: 'pomodoro-active',
     *    color: 'red',
     *  },
     *  shortBreak: {
     *    text: 'Short break',
     *    className: 'short-break-active',
     *    color: 'blue', 
     *  },
     *  longBreak: {
     *    text: 'Long break',
     *    className: 'long-break-active',
     *    color: 'purple', 
     *  }
     * }
     * 
     * Ai com isso tu recebe a prop `type` e acessa esse objeto para construir o seu ciclo:
     * const { text, className, color } = CICLE_TYPES[type]
     * 
     * OBS: Teoricamente os valores são em minutos e segundos são pré definidos, então até isso poderia ser abstraído:
     * ficando algo como: 
     * pomodoro: {
     *    text: 'Pomodoro',
     *    className: 'pomodoro-active',
     *    color: 'red',
     *    minutes: 25,
     *    seconds: 0,
     * }
     */
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

        <h2
          id="cicle"
          className="cicle"
          style={{ color: 'var(--background-circle)' }}
        >
          Bem vindo ao pomos!
        </h2>
      </div>
    </section>
  );
};

export default Timer;
