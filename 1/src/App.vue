<script setup lang="ts">
import { ref } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'

type Todo = {
  id: number
  text: string
  completed: boolean
}

const todos = ref<Todo[]>([
  {
    id: 1,
    text: 'First item',
    completed: true
  },
  {
    id: 2,
    text: 'Second item',
    completed: false
  },
  {
    id: 3,
    text: 'Third item',
    completed: false
  }
])

const addTodo = (text: string) => {
  todos.value.push({
    id: Date.now(),
    text,
    completed: false
  })
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id)

  if (todo) {
    todo.completed = !todo.completed
  }
}

const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}
</script>

<template>
  <main class="app">
    <h1>ToDo List</h1>

    <TodoForm @add="addTodo" />

    <section class="list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @delete="deleteTodo"
      />
    </section>
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
</style>