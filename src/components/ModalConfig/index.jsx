import React, { useState } from 'react';
import Modal from 'react-modal';
import settings from '../../assets/settings.svg';

import './style.css';

Modal.setAppElement('#root');

const ModalConfig = ({
  pomodoroTimer,
  shortBreakTimer,
  longBreakTimer,
  setPomodoroTimer,
  setShortBreakTimer,
  setLongBreakTimer,
  set,
  initCicle,
  cicle,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function save(event) {
    event.preventDefault();
    try {
      set([pomodoroTimer, shortBreakTimer, longBreakTimer]);
      if (cicle != 'apresentation') {
        const result = initCicle(cicle);
        if (result === true) {
          alert('Dados atualizados com sucesso!');
        }
      }
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container-modal">
      <img onClick={openModal} src={settings} alt="configurações" />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="exemplo"
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <form className="formulario">
          <h2>Configurações</h2>
          <p>
            Personalise os valores abaixo <strong>em minutos</strong>.
          </p>
          <label className="pomodoro-timer" htmlFor="pomodoro">
            Pomodoro:
            <input
              id="pomodoro"
              type="number"
              placeholder="Ex: 25"
              min={1}
              value={pomodoroTimer}
              onChange={(event) => setPomodoroTimer(event.target.value)}
              required
            />
          </label>

          <label className="short-break-timer" htmlFor="short-break">
            Short break:
            <input
              id="short-break"
              type="number"
              placeholder="Ex: 5"
              min={1}
              value={shortBreakTimer}
              onChange={(event) => setShortBreakTimer(event.target.value)}
              required
            />
          </label>

          <label className="long-break-timer" htmlFor="long-break">
            Long break:
            <input
              id="long-break"
              type="number"
              min={1}
              placeholder="Ex: 15"
              value={longBreakTimer}
              onChange={(event) => setLongBreakTimer(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="button submit" onClick={save}>
            Salvar
          </button>
        </form>

        <button className="button close" onClick={closeModal}>
          Cancelar
        </button>
      </Modal>
    </div>
  );
};

export default ModalConfig;
