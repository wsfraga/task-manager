const inputText = document.querySelector('[data-task="task-new"]');
const btnTaskAdd = document.querySelector('[data-task="task-add"]');
const taskList = document.querySelector('[data-task="task-list"]');

// Events to Add Task

inputText.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.code === 'Enter') sendTask();
});

btnTaskAdd.addEventListener('click', () => sendTask());


function sendTask() {
  if (inputText.value.trim() === '') return;

  createTask()

  inputText.value = '';
  inputText.focus();
}

// ----------------

function createTask() {

  const newLi = document.createElement('li');
  newLi.classList.add('task-card');

  const date = new Date();
  const dateNow = date.toLocaleDateString('pt-BR');
  const dateHour = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  newLi.innerHTML = `
      <div class="task-card-step">
        <button class="task-card-btn">
          <i class="task-card-check"></i>
        </button>
      </div>

      <div class="task-card-item">
        <h3 class="task-card-name">${inputText.value}</h3>
        <span class="task-card-info">
          Criada em ${dateNow} às ${dateHour}
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

function deleteTask() {

  taskList.addEventListener('click', (event) => {
    const btnDelete = event.target.closest('[data-task="task-delete"]');

    if (btnDelete) {
      btnDelete.closest('li').remove();
    }
  });
}

deleteTask();