<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/TasksStore'

const tasksStore = useTasksStore()

const { tasks, hasTasks, completedTasksCount } = storeToRefs(tasksStore)
const { toggleTaskCompleted, deleteTask } = tasksStore
</script>

<template>
  <section class="card">
    <div class="card-header">
      <h2>Список задач</h2>

      <RouterLink class="add-link" :to="{ name: 'add-task' }">
        + Добавить
      </RouterLink>
    </div>

    <div v-if="hasTasks">
      <p class="counter">
        Выполнено: {{ completedTasksCount }} из {{ tasks.length }}
      </p>

      <ul class="task-list">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.completed }"
        >
          <div class="task-content">
            <label class="task-title">
              <input
                type="checkbox"
                :checked="task.completed"
                @change="toggleTaskCompleted(task.id)"
              />

              <span>
                #{{ task.id }} — {{ task.title }}
              </span>
            </label>

            <RouterLink
              class="details-link"
              :to="{
                name: 'task-details',
                params: {
                  id: task.id
                }
              }"
            >
              Открыть задачу
            </RouterLink>
          </div>

          <button
            class="delete-button"
            type="button"
            @click="deleteTask(task.id)"
          >
            Удалить
          </button>
        </li>
      </ul>
    </div>

    <p v-else class="empty">
      Задач пока нет. Перейдите на страницу добавления задачи.
    </p>
  </section>
</template>

<style scoped>
.card {
  padding: 32px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 400;
}

.add-link,
.details-link {
  color: #2f80ed;
  text-decoration: none;
}

.counter {
  margin: 0 0 16px;
  color: #555;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid #d8e0ef;
  border-radius: 8px;
}

.task-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.completed .task-title span {
  color: #888;
  text-decoration: line-through;
}

.delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #e53935;
  color: white;
  cursor: pointer;
}

.empty {
  margin: 0;
  color: #555;
}
</style>