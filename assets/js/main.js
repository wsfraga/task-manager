import { 
  saveTasks, 
  loadTasks 
} from "./storege.js";

import { 
  renderTask,
  updateTaskStats
 } from "./ui.js";

import { createTask, 
  toggleTaskCompleted, 
  handleDeleteTask,
} from "./tasks.js";


const inputText = document.querySelector('[data-task="task-new"]');

const btnTaskAdd = document.querySelector('[data-task="task-add"]');

const taskList = document.querySelector('[data-task="task-list"]');


let tasks = loadTasks();


tasks.forEach((task) => {
  renderTask(task, taskList);
})

// Events to Add Task

inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.code === 'Enter') {
    handleAddTask();
  } 
});

btnTaskAdd.addEventListener('click', handleAddTask);



function handleAddTask() {
  const taskName = inputText.value.trim()
  if (taskName === '') return;

  const task = createTask(taskName, tasks);
  renderTask(task, taskList);

  updateTaskStats(tasks);
  saveTasks(tasks);

  inputText.value = '';
  inputText.focus();
}

// ----------------

taskList.addEventListener('click', (event) => {
  toggleTaskCompleted(event, tasks);
  updateTaskStats(tasks);
  saveTasks(tasks);
});

taskList.addEventListener('click', (event) => {
  handleDeleteTask(event, tasks);
  updateTaskStats(tasks);
  saveTasks(tasks);
});

updateTaskStats(tasks);
