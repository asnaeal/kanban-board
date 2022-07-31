import axios from 'axios';
import { TaskInfo } from '../../type/task';

interface Props {
  taskList: TaskInfo[];
}

export default function useAxios({ taskList }: Props) {
  let copyTaskList = [...taskList];

  axios.get('/data/data.json').then(({ data }) => {
    data.tasks.forEach((importedTask: { type: any; title: any; author: any; content: any }) => {
      const task: TaskInfo = {
        id: copyTaskList.length,
        type: importedTask.type,
        title: importedTask.title,
        author: importedTask.author,
        content: importedTask.content,
      };
      copyTaskList.push(task);
    });
  });

  return copyTaskList;
}
