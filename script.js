const inputText = document.querySelector('[data-task="task-new"]');

const btnTaskAdd = document.querySelector('[data-task="task-add"]');
const taskList = document.querySelector('[data-task="task-list"]');

let tasks = [];

function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTask() {
  const tasksSaved = localStorage.getItem('tasks');

  if (tasksSaved) {
    tasks = JSON.parse(tasksSaved);
  } else {
    tasks = [];
  }
}

loadTask();

tasks.forEach((task) => {
  createTaskView(task);
})
// Events to Add Task

inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.code === 'Enter') sendTask();
});

btnTaskAdd.addEventListener('click', () => sendTask());


function sendTask() {
  const taskName = inputText.value.trim()
  if (taskName === '') return;

  const task = createArrayTask(taskName);
  createTaskView(task);
  saveTask();

  inputText.value = '';
  inputText.focus();
}

// ----------------

function createArrayTask(nameTask) {
  const date = new Date();

  const newTask = {
    id: Date.now(),
    name: nameTask,
    dateNow: date.toLocaleDateString('pt-BR'),
    dateHour: date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }),
    completed: false,
  };
  tasks.push(newTask);
  return newTask;
}


function createTaskView(task) {
  const newLi = document.createElement('li');


  newLi.classList.add('task-card');
  newLi.dataset.id = task.id;

  newLi.innerHTML = `
      <div class="task-card-step">
        <button class="task-card-btn" data-task="state">
          <i class="task-card-check"></i>
        </button>
      </div>

      <div class="task-card-item">
        <h3 class="task-card-name">${task.name}</h3>
        <span class="task-card-info">
          Criada em ${task.dateNow} às ${task.dateHour}
        </span>
      </div>

      <div class="task-card-change">

        <button class="task-card-edit">
        </button>

        <button class="task-card-delete" data-task="task-delete">
        </button>
      </div>
  `
  taskList.appendChild(newLi);

  if (task.completed) {
    newLi.classList.add('completed');
  }
}

function deleteTask(event) {
  const btnDelete = event.target.closest('[data-task="task-delete"]');

  if (!btnDelete) return;

  const taskCard = btnDelete.closest('.task-card');
  const taskId = Number(taskCard.dataset.id);
  

  const taskIndex = tasks.findIndex((task) => {
    return task.id === taskId;
  })

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }

  saveTask()
  taskCard.remove();
}

function completedTask(event) {
  const btnCompleted = event.target.closest('[data-task="state"]');

  if (!btnCompleted) return;

  const taskCard = btnCompleted.closest('.task-card');
  const taskId = Number(taskCard.dataset.id);

  const taskIndex = tasks.findIndex((task) => {
    return task.id === taskId;
  })
  
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    taskCard.classList.toggle('completed');
  }

  saveTask();
}

taskList.addEventListener('click', completedTask);
taskList.addEventListener('click', deleteTask);
