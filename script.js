const inputText = document.querySelector('[data-task="task-new"]');

const btnTaskAdd = document.querySelector('[data-task="task-add"]');
const taskList = document.querySelector('[data-task="task-list"]');

const tasks = [];


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
        <button class="task-card-btn">
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
}



taskList.addEventListener('click', (event) => {
  const btnDelete = event.target.closest('[data-task="task-delete"]');
  if (!btnDelete) return;
  
  const taskCard = btnDelete.closest('.task-card');
  const taskId = Number(taskCard.dataset.id);
  

  const taskIndex = tasks.findIndex((task) => {
    return task.id === taskId
  })

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }

  taskCard.remove();
});