<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useTasksStore } from '../stores/TasksStore'

const router = useRouter()
const tasksStore = useTasksStore()

const { addTask } = tasksStore

const taskTitle = ref<string>('')
const errorMessage = ref<string>('')

const isSubmitDisabled = computed(() => {
  return !taskTitle.value.trim()
})

async function submitTask(): Promise<void> {
  const title = taskTitle.value.trim()

  if (!title) {
    errorMessage.value = 'Введите текст задачи'
    return
  }

  const newTask = addTask(title)

  taskTitle.value = ''
  errorMessage.value = ''

  await router.push({
    name: 'task-details',
    params: {
      id: newTask.id
    }
  })
}
</script>

<template>
  <section class="card">
    <h2>Добавить задачу</h2>

    <form class="form" @submit.prevent="submitTask">
      <label for="task-title">
        Название задачи
      </label>

      <input
        id="task-title"
        v-model="taskTitle"
        type="text"
        placeholder="Например: выучить Vue Router"
      />

      <span v-if="errorMessage" class="error">
        {{ errorMessage }}
      </span>

      <button
        class="button"
        type="submit"
        :disabled="isSubmitDisabled"
      >
        Добавить задачу
      </button>
    </form>

    <RouterLink class="back-link" :to="{ name: 'tasks' }">
      Вернуться к списку задач
    </RouterLink>
  </section>
</template>

<style scoped>
.card {
  padding: 32px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

h2 {
  margin: 0 0 24px;
  font-size: 24px;
  font-weight: 400;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-size: 14px;
  color: #333;
}

input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
}

input:focus {
  outline: none;
  border-color: #2f80ed;
}

.error {
  font-size: 13px;
  color: #e53935;
}

.button {
  margin-top: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  background: #2f80ed;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.button:disabled {
  background: #a8c8f0;
  cursor: not-allowed;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #2f80ed;
  text-decoration: none;
}
</style>