import { MouseEventHandler, useCallback } from 'react';
import { TaskInfo } from '../type/task';

interface Props {
  task: TaskInfo;
  onPress: (n: number) => void;
}

export default function TaskItem({ task, onPress }: Props) {
  const clicked = useCallback<MouseEventHandler>(
    (e) => {
      e.stopPropagation();
      onPress(task.id);
    },
    [onPress, task.id],
  );

  return (
    <div style={{ padding: '20px', border: '1px solid', marginBottom: '20px' }} onClick={clicked}>
      <div>{task.title}</div>
    </div>
  );
}
