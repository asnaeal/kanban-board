import TaskItem from './TaskItem';
import { TaskInfo } from '../type/task';

interface Props {
  taskType: string;
  taskList: TaskInfo[];
  onPress: (n: number) => void;
}

export default function TaskList({ taskType, taskList, onPress }: Props) {
  return (
    <div style={{ padding: '20px', border: '1px solid', marginRight: '20px', flexGrow: 1 }}>
      <div style={{ paddingBottom: '20px' }}>{taskType}</div>
      {taskList
        .filter((task) => task.type === taskType)
        .map((task) => (
          <TaskItem key={task.id} task={task} onPress={onPress} />
        ))}
    </div>
  );
}
