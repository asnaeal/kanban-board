import { useEffect, useState } from 'react';
import { TaskInfo } from '../type/task';
import Modal from './modal/Modal';

interface Props {
  isOpen: boolean;
  setOpen: (b: boolean) => void;
  taskTypes: string[];
  task: TaskInfo;
  updateTask: (t: TaskInfo) => void;
}

export default function TaskDetail({ isOpen, setOpen, taskTypes, task, updateTask }: Props) {
  const [updatedtask, setUpdatedTask] = useState<TaskInfo>(task);
  useEffect(() => {
    if (task) {
      setUpdatedTask(task);
    }
  }, [task]);

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setOpen(!isOpen)}>
      <div style={{ textAlign: 'right' }}>
        <select value={updatedtask.type} onChange={(e) => setUpdatedTask({ ...updatedtask, type: e.target.value })}>
          {taskTypes.map((taskType: string, index: number) => (
            <option key={index} value={taskType}>
              {taskType}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>id: {task.id}</p>
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>제목</p>
        <input type={'text'} value={updatedtask.title} onChange={(e) => setUpdatedTask({ ...updatedtask, title: e.target.value })} />
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>작성자</p>
        <input type={'text'} value={updatedtask.author} onChange={(e) => setUpdatedTask({ ...updatedtask, author: e.target.value })} />
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{ width: '100px' }}>내용</p>
        <input type={'text'} value={updatedtask.content} onChange={(e) => setUpdatedTask({ ...updatedtask, content: e.target.value })} />
      </div>
      <button
        onClick={() => {
          updateTask(updatedtask);
          setOpen(!isOpen);
        }}
      >
        저장
      </button>
      <button onClick={() => setOpen(!isOpen)}>닫기</button>
    </Modal>
  );
}
