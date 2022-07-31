import { useState } from 'react';
import { TaskInfo } from '../../type/task';
import Modal from './Modal';

interface Props {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  taskLength: number;
  taskType: string[];
  addTask: (t: TaskInfo) => void;
}

export default function AddTaskModal({ isOpen, setOpen, taskLength, taskType, addTask }: Props) {
  const initialTask = {
    id: taskLength,
    type: taskType[0],
    title: '',
    author: '',
    content: '',
  };
  const [task, setTask] = useState<TaskInfo>(initialTask);

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen(!isOpen)}>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>제목: </p>
        <input type={'text'} value={task?.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>작성자: </p>
        <input type={'text'} value={task?.author} onChange={(e) => setTask({ ...task, author: e.target.value })} />
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>내용: </p>
        <input type={'text'} value={task?.content} onChange={(e) => setTask({ ...task, content: e.target.value })} />
      </div>

      <button
        onClick={() => {
          addTask(task);
          setTask(initialTask);
          setOpen(!isOpen);
        }}
      >
        추가
      </button>
      <button onClick={() => setOpen(!isOpen)}>취소</button>
    </Modal>
  );
}
