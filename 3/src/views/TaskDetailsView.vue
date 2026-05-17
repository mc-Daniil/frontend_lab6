<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/TasksStore'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const tasksStore = useTasksStore()

const { getTaskById } = storeToRefs(tasksStore)

const taskId = computed(() => {
  return Number(props.id)
})

const task = computed(() => {
  return getTaskById.value(taskId.value)
})

async function goToCompletePage(): Promise<void> {
  await router.push({
    name: 'task-complete',
    params: {
      id: taskId.value
    }
  })
}

async function goToDeletePage(): Promise<void> {
  await router.push({
    name: 'task-delete',
    params: {
      id: taskId.value
    }
  })
}
</script>

<template>
  <section class="card">
    <div v-if="task">
      <h2>Задача #{{ task.id }}</h2>

      <p class="title">
        {{ task.title }}
      </p>

      <p class="status">
        Статус:
        <span v-if="task.completed">
          выполнена
        </span>
        <span v-else>
          не выполнена
        </span>
      </p>

      <div class="actions">
        <button
          class="button"
          type="button"
          @click="goToCompletePage"
        >
          Изменить статус
        </button>

        <button
          class="delete-button"
          type="button"
          @click="goToDeletePage"
        >
          Удалить
        </button>
      </div>
    </div>

    <div v-else>
      <h2>Задача не найдена</h2>

      <p class="empty">
        В Pinia state нет задачи с id {{ id }}.
      </p>
    </div>

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

.title {
  margin: 0 0 16px;
  font-size: 20px;
}

.status {
  margin: 0 0 24px;
  color: #555;
}

.actions {
  display: flex;
  gap: 12px;
}

.button,
.delete-button {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.button {
  background: #2f80ed;
}

.delete-button {
  background: #e53935;
}

.back-link {
  display: inline-block;
  margin-top: 24px;
  color: #2f80ed;
  text-decoration: none;
}

.empty {
  margin: 0;
  color: #555;
}
</style>