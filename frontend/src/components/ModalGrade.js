import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import * as api from '../api/apiService';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;

  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };
    getValidation();
  }, [type]);

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if (gradeValidation.value < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue}`
      );
      return;
    }
    setErrorMessage('');
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleClose = () => {
    onClose(null);
  };
  const handleFormSubmit = (event) => {};
  const handleGradeChange = (event) => {
    console.log(gradeValidation);
    setGradeValue(+event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de Notas</span>
          <button
            className="waves-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}></form>

        <div className="input-field">
          <input type="text" value={student} id="inputName" readOnly />
          <label className="active" htmlFor="inputName">
            Nome do aluno:
          </label>
        </div>

        <div className="input-field">
          <input type="text" value={subject} id="inputSubject" readOnly />
          <label className="active" htmlFor="inputSubject">
            Disciplina:
          </label>
        </div>

        <div className="input-field">
          <input type="text" value={type} id="inputType" readOnly />
          <label className="active" htmlFor="inputType">
            Tipo de Avaliação:
          </label>
        </div>

        <div className="input-field">
          <input
            id="inputGrade"
            type="number"
            min={gradeValidation.minValue}
            max={gradeValidation.maxValue}
            step="1"
            autoFocus
            value={gradeValue}
            onChange={handleGradeChange}
          />
          <label className="active" htmlFor="inputGrade">
            Nota:
          </label>
        </div>
        <div style={styles.flexRow}>
          <button
            className="waves-effect waves-lights btn"
            disabled={errorMessage.trim() !== ''}
          >
            Salvar
          </button>
          <span style={styles.errorMessage}>{errorMessage}</span>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
  title: {
    fontSize: '1.3rem',
    fontWeigh: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontWeigh: 'bold',
  },
};
