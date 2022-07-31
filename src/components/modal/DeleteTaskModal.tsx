import { useEffect, useState } from 'react';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  taskTypes: string[];
  deleteTask: (s: string) => void;
}

export default function DeleteTaskModal({ isOpen, setOpen, taskTypes, deleteTask }: Props) {
  const [selectedType, setSelectedType] = useState('');
  useEffect(() => {
    if (taskTypes) {
      setSelectedType(taskTypes[0]);
    }
  }, [taskTypes]);

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen(!isOpen)}>
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        {taskTypes.map((taskType: string, index: number) => (
          <option key={index} value={taskType}>
            {taskType}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          deleteTask(selectedType);
          setOpen(!isOpen);
        }}
      >
        제거
      </button>
      <button onClick={() => setOpen(!isOpen)}>취소</button>
    </Modal>
  );
}
