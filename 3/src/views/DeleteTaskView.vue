<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useTasksStore } from '../stores/TasksStore'

const props = defineProps<{
  id: string
}>()

const tasksStore = useTasksStore()

const { deleteTask } = tasksStore

const isDeleted = ref<boolean>(false)

const taskId = computed(() => {
  return Number(props.id)
})

watch(
  () => props.id,
  () => {
    deleteTask(taskId.value)
    isDeleted.value = true
  },
  {
    immediate: true
  }
)
</script>

<template>
  <section class="card">
    <h2 v-if="isDeleted">
      Task deleted
    </h2>

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

.back-link {
  color: #2f80ed;
  text-decoration: none;
}
</style>