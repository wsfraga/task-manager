export function createTask(nameTask, tasks) {
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

export function toggleTaskCompleted(event, tasks) {
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
}

export function handleDeleteTask(event, tasks) {
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

  taskCard.remove();
}