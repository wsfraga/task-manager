export function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function loadTasks() {
  const tasksSaved = localStorage.getItem('tasks');

  if (tasksSaved) {
    return JSON.parse(tasksSaved);
  } else {
    return [];
  }
}