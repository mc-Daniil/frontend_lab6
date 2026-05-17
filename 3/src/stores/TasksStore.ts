import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  completed: boolean
}

interface TasksState {
  tasks: Task[]
}

const TASKS_STORAGE_KEY = 'todo-router-lab-tasks'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const task = value as Task

  return (
    typeof task.id === 'number' &&
    typeof task.title === 'string' &&
    typeof task.completed === 'boolean'
  )
}

function readTasksFromLocalStorage(): Task[] {
  const rawTasks = localStorage.getItem(TASKS_STORAGE_KEY)

  if (!rawTasks) {
    return []
  }

  try {
    const parsedTasks = JSON.parse(rawTasks)

    if (!Array.isArray(parsedTasks)) {
      return []
    }

    return parsedTasks.filter(isTask)
  } catch {
    return []
  }
}

function saveTasksToLocalStorage(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}

function getNextTaskId(tasks: Task[]): number {
  if (tasks.length === 0) {
    return 1
  }

  const maxId = Math.max(...tasks.map((task) => task.id))

  return maxId + 1
}

export const useTasksStore = defineStore('TasksStore', {
  state: (): TasksState => {
    return {
      tasks: readTasksFromLocalStorage()
    }
  },

  getters: {
    hasTasks: (state): boolean => {
      return state.tasks.length > 0
    },

    completedTasksCount: (state): number => {
      return state.tasks.filter((task) => task.completed).length
    },

    getTaskById: (state) => {
      return (taskId: number): Task | undefined => {
        return state.tasks.find((task) => task.id === taskId)
      }
    }
  },

  actions: {
    saveTasks(): void {
      saveTasksToLocalStorage(this.tasks)
    },

    addTask(title: string): Task {
      const newTask: Task = {
        id: getNextTaskId(this.tasks),
        title,
        completed: false
      }

      this.tasks.push(newTask)
      this.saveTasks()

      return newTask
    },

    toggleTaskCompleted(taskId: number): void {
      const task = this.tasks.find((currentTask) => currentTask.id === taskId)

      if (!task) {
        return
      }

      task.completed = !task.completed
      this.saveTasks()
    },

    deleteTask(taskId: number): void {
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
      this.saveTasks()
    }
  }
})