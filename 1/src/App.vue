<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import Popup from './components/Popup.vue'

type Todo = {
  id: number
  apiId?: number
  text: string
  completed: boolean
}

type ApiTodo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const apiUrl = 'https://jsonplaceholder.typicode.com'
const userId = 1
const storageKey = 'api-todos'

const todos = ref<Todo[]>([])
const isLoading = ref(false)
const error = ref('')
const deletingTodoId = ref<number | null>(null)

const saveTodos = () => {
  localStorage.setItem(storageKey, JSON.stringify(todos.value))
}

const getSavedTodos = () => {
  const savedTodos = localStorage.getItem(storageKey)

  if (savedTodos) {
    return JSON.parse(savedTodos) as Todo[]
  }

  return null
}

const getApiId = (todo: Todo) => {
  const id = todo.apiId || todo.id

  if (id > 200) {
    return 1
  }

  return id
}

const request = async <T>(url: string, options?: RequestInit) => {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error()
  }

  return response.json() as Promise<T>
}

const loadTodos = async () => {
  const savedTodos = getSavedTodos()

  if (savedTodos) {
    todos.value = savedTodos
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const data = await request<ApiTodo[]>(`${apiUrl}/users/${userId}/todos`)

    todos.value = data.map((todo) => ({
      id: todo.id,
      apiId: todo.id,
      text: todo.title,
      completed: todo.completed
    }))

    saveTodos()
  } catch {
    error.value = 'Не удалось загрузить задачи'
  } finally {
    isLoading.value = false
  }
}

const addTodo = async (text: string) => {
  error.value = ''

  try {
    const todo = await request<ApiTodo>(`${apiUrl}/todos`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        title: text,
        completed: false
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    todos.value.push({
      id: Date.now(),
      apiId: todo.id,
      text: todo.title,
      completed: todo.completed
    })

    saveTodos()
  } catch {
    error.value = 'Не удалось добавить задачу'
  }
}

const toggleTodo = async (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id)

  if (!todo) {
    return
  }

  const completed = !todo.completed
  error.value = ''

  try {
    await request<ApiTodo>(`${apiUrl}/todos/${getApiId(todo)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    todo.completed = completed
    saveTodos()
  } catch {
    error.value = 'Не удалось изменить задачу'
  }
}

const askDeleteTodo = (id: number) => {
  deletingTodoId.value = id
}

const cancelDeleteTodo = () => {
  deletingTodoId.value = null
}

const confirmDeleteTodo = async () => {
  const id = deletingTodoId.value

  if (!id) {
    return
  }

  const todo = todos.value.find((todo) => todo.id === id)

  if (!todo) {
    deletingTodoId.value = null
    return
  }

  error.value = ''

  try {
    const response = await fetch(`${apiUrl}/todos/${getApiId(todo)}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error()
    }

    todos.value = todos.value.filter((todo) => todo.id !== id)
    deletingTodoId.value = null
    saveTodos()
  } catch {
    error.value = 'Не удалось удалить задачу'
  }
}

onMounted(loadTodos)
</script>

<template>
  <main class="app">
    <h1>ToDo List</h1>

    <TodoForm @add="addTodo" />

    <p v-if="isLoading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <section class="list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="askDeleteTodo"
      />
    </section>

    <Popup v-if="deletingTodoId" @close="cancelDeleteTodo">
      <div class="warning">!</div>

      <h2>Delete?</h2>

      <p>Please ensure and then confirm!</p>

      <div class="popup-actions">
        <button class="cancel" @click="cancelDeleteTodo">
          No, cancel!
        </button>

        <button class="confirm" @click="confirmDeleteTodo">
          Yes, delete it!
        </button>
      </div>
    </Popup>
  </main>
</template>

<style scoped>
.app {
  max-width: 700px;
  margin: 60px auto;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 24px;
  font-size: 32px;
  font-weight: 400;
}

.list {
  margin-top: 32px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.error {
  color: #e53935;
}

.warning {
  width: 82px;
  height: 82px;
  margin: 0 auto 24px;
  border: 4px solid #f6c99c;
  border-radius: 50%;
  color: #f6a55c;
  font-size: 54px;
  line-height: 82px;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

.popup-actions button {
  padding: 14px 26px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.cancel {
  background: #b5b5b5;
}

.confirm {
  background: #2f80ed;
}
</style>