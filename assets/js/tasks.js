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

    const taskInfo = taskCard.querySelector('.task-card-info');

    if(tasks[taskIndex].completed) {
    taskInfo.innerText = `Concluida`;
    } else {
      taskInfo.innerHTML = `
      Criada em ${tasks[taskIndex].dateNow} às ${tasks[taskIndex].dateHour}`
    }
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

export function filterTasks(tasks, filterType) {

  if (filterType === 'all') {
    return tasks;

  } else if (filterType === 'completed') {
    const filteredTasks = tasks.filter((task) => {
      return task.completed;
    })
    return filteredTasks

  } else if (filterType === 'pending') {
    const filteredTasks = tasks.filter((task) => {
      return !task.completed;
    })
    return filteredTasks
  }
  return tasks;
}

export function handleEditTask(event, tasks) {
  const btnEdit = event.target.closest('[data-task="task-edit"]');
  if (!btnEdit) return;

  const taskCard = btnEdit.closest('.task-card');
  const taskId = Number(taskCard.dataset.id);

  const taskIndex = tasks.findIndex((task) => {
    return task.id === taskId;
  })
  if (taskIndex === -1) return;

  const newName = prompt('Digite o novo nome', tasks[taskIndex].name);
  if (newName === null) return
  if (newName.trim() === '') return;

  const taskCardName = taskCard.querySelector('.task-card-name')

  tasks[taskIndex].name = newName;
  taskCardName.innerText = newName;

  saveTasks(tasks);
}