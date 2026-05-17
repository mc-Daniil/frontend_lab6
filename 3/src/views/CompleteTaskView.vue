<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getTasks, saveTasks } from '../storage/tasksStorage'

const props = defineProps<{
  id: string
}>()

const isChanged = ref<boolean>(false)
const isFound = ref<boolean>(false)

const taskId = computed(() => {
  return Number(props.id)
})

onMounted(() => {
  const tasks = getTasks()

  const updatedTasks = tasks.map((task) => {
    if (task.id !== taskId.value) {
      return task
    }

    isFound.value = true

    return {
      ...task,
      completed: !task.completed
    }
  })

  saveTasks(updatedTasks)

  isChanged.value = true
})
</script>

<template>
  <section class="card">
    <h2 v-if="isChanged && isFound">
      Task status has been changed
    </h2>

    <h2 v-else-if="isChanged && !isFound">
      Task not found
    </h2>

    <RouterLink class="back-link" :to="{ name: 'tasks' }">
      Вернуться к списку задач
    </RouterLink>

    <RouterLink
      class="details-link"
      :to="{
        name: 'task-details',
        params: {
          id
        }
      }"
    >
      Открыть задачу
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

.back-link,
.details-link {
  display: inline-block;
  margin-right: 16px;
  color: #2f80ed;
  text-decoration: none;
}
</style>