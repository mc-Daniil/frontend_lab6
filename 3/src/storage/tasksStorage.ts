export interface Task {
  id: number
  title: string
  completed: boolean
}

const TASKS_STORAGE_KEY = 'todo-router-lab-tasks'

export function getTasks(): Task[] {
  const rawTasks = localStorage.getItem(TASKS_STORAGE_KEY)

  if (!rawTasks) {
    return []
  }

  try {
    const tasks = JSON.parse(rawTasks)

    return Array.isArray(tasks) ? tasks : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}

function getNextTaskId(tasks: Task[]): number {
  if (tasks.length === 0) {
    return 1
  }

  const maxId = Math.max(...tasks.map((task) => task.id))

  return maxId + 1
}

export function createTask(title: string, tasks: Task[]): Task {
  return {
    id: getNextTaskId(tasks),
    title,
    completed: false
  }
}