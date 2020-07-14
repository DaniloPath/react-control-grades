import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  return (
    <div>
      <Modal isOpen={true} />
    </div>
  );
}
