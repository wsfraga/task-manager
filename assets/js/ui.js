import { saveTasks } from "./storege.js";

export function renderTask(task, taskList) {
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
      <span class="task-card-info"> Criada em ${task.dateNow} às ${task.dateHour} </span>
       </div> 
       <div class="task-card-change"> 
       <button class="task-card-edit"> </button> 
       <button class="task-card-delete" data-task="task-delete"> 
        </button> 
        </div>`

  taskList.appendChild(newLi);

  if (task.completed) {
    newLi.classList.add('completed');
  }
}

const taskTotal = document.querySelector('.task-list-total p span')
const taskTotalCompleted = document.querySelector('.task-list-completed p span')
const taskTotalPending = document.querySelector('.task-list-pending p span')

export function updateTaskStats(tasks) {
  taskTotal.innerText = tasks.length;
  
  const taskCompleted = tasks.filter(task => task.completed);
  taskTotalCompleted.innerText = taskCompleted.length;

  taskTotalPending.innerText = tasks.length - taskCompleted.length;
}