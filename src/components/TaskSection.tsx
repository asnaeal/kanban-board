import { isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { TaskInfo } from '../type/task';
import AddTaskModal from './modal/AddTaskModal';
import AddTaskTypeModal from './modal/AddTaskTypeModal';
import DeleteTaskTypeModal from './modal/DeleteTaskTypeModal';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList';
import useAxios from './hook/useAxios';

const DEFAULT_TASK_TYPE = ['TODO', 'InProgress', 'Done'];

export default function TaskSection() {
  const [taskType, setTaskType] = useState(DEFAULT_TASK_TYPE);
  const [taskList, setTaskList] = useState<TaskInfo[]>([]);

  const addTaskType = useCallback((type: string) => setTaskType([...taskType, type]), [taskType]);
  const deleteTaskType = useCallback(
    (deleteType: string) => {
      setTaskType(taskType.filter((type) => type !== deleteType));
    },
    [taskType],
  );
  const addTask = useCallback((task: TaskInfo) => setTaskList([...taskList, task]), [taskList]);
  const updateTask = useCallback(
    (updateTask: TaskInfo) => {
      const index = taskList.findIndex((task) => task.id === updateTask.id);
      let copyTaskList = [...taskList];

      if (index !== -1) {
        copyTaskList[index] = updateTask;
      }

      setTaskList(copyTaskList);
      setClickedIndex(undefined);
    },
    [taskList],
  );

  const importedTask = useAxios({ taskList });
  const importTasks = () => {
    setTaskList(importedTask);
  };

  const exportTasks = useCallback(() => {
    let copyTaskList = [...taskList];
    let resultTaskList: { type: string; title: string; author: string; content: string }[] = [];
    copyTaskList.map(({ type, title, author, content }) => {
      const task = {
        type,
        title,
        author,
        content,
      };
      resultTaskList.push(task);
    });

    console.log(JSON.stringify(resultTaskList));
  }, [taskList]);

  const [addTaskTypeModalVisible, setAddTaskTypeModalVisible] = useState(false);
  const [deleteTaskTypeModalVisible, setDeleteTaskTypeModalVisible] = useState(false);
  const [disabledSetting, setDisabledSetting] = useState(true);
  useEffect(() => {
    if (!isEmpty(taskType.filter((type) => !DEFAULT_TASK_TYPE.includes(type)))) {
      setDisabledSetting(false);
    } else {
      setDisabledSetting(true);
    }
  }, [taskType]);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [taskDetailModalVisible, setTaskDetailModalVisible] = useState(false);

  const [clickedIndex, setClickedIndex] = useState<number | undefined>(undefined);
  const onPress = useCallback(
    (n: number) => {
      const index = taskList.findIndex((task) => task.id === n);
      setClickedIndex(index);
    },
    [taskList],
  );

  useEffect(() => {
    if (clickedIndex !== undefined) {
      setTaskDetailModalVisible(true);
    }
  }, [clickedIndex]);

  return (
    <section style={{ padding: '20px' }}>
      <div style={{ paddingBottom: '20px', display: 'flex', justifyContent: 'right' }}>
        <button onClick={() => importTasks()}>import</button>
        <button style={{ marginLeft: '10px' }} onClick={() => exportTasks()}>
          export
        </button>
        <button style={{ marginLeft: '10px' }} onClick={() => setAddTaskTypeModalVisible(true)}>
          tasklist추가
        </button>
        <button style={{ marginLeft: '10px' }} disabled={disabledSetting} onClick={() => setDeleteTaskTypeModalVisible(true)}>
          tasklist제거
        </button>
        <button style={{ marginLeft: '10px' }} onClick={() => setAddTaskModalVisible(true)}>
          task추가
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        {taskType.map((type) => (
          <TaskList key={type} taskType={type} taskList={taskList} onPress={onPress} />
        ))}
      </div>
      <AddTaskTypeModal isOpen={addTaskTypeModalVisible} setOpen={setAddTaskTypeModalVisible} addTaskType={addTaskType} />
      <DeleteTaskTypeModal
        isOpen={deleteTaskTypeModalVisible}
        setOpen={setDeleteTaskTypeModalVisible}
        taskTypes={taskType.filter((type) => !DEFAULT_TASK_TYPE.includes(type))}
        deleteTaskType={deleteTaskType}
      />
      <AddTaskModal
        isOpen={addTaskModalVisible}
        setOpen={setAddTaskModalVisible}
        taskLength={taskList.length}
        taskType={taskType}
        addTask={addTask}
      />
      {clickedIndex !== undefined && (
        <TaskDetail
          isOpen={taskDetailModalVisible}
          setOpen={setTaskDetailModalVisible}
          task={taskList[clickedIndex]}
          updateTask={updateTask}
          taskTypes={taskType}
        />
      )}
    </section>
  );
}
