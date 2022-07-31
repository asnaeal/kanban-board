import { useState } from 'react';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  addTaskType: (s: string) => void;
}

export default function AddTaskTypeModal({ isOpen, setOpen, addTaskType }: Props) {
  const [type, setType] = useState('');

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen(!isOpen)}>
      <input type={'text'} value={type} onChange={(e) => setType(e.target.value)} />
      <button
        onClick={() => {
          addTaskType(type);
          setType('');
          setOpen(!isOpen);
        }}
      >
        추가
      </button>
      <button onClick={() => setOpen(!isOpen)}>취소</button>
    </Modal>
  );
}
