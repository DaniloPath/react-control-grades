import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { gradeValue, setGradeValue } = useState(selectedGrade.value);
  //
  const { gradeValidation, setGradeValidation } = useState({});
  const { erroMessage, setErroMessage } = useState('');
  return (
    <div>
      <Modal isOpen={true} />
    </div>
  );
}
