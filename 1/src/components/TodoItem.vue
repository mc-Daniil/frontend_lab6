<script setup lang="ts">
type Todo = {
  id: number
  text: string
  completed: boolean
}

defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id)"
    />

    <span :class="{ completed: todo.completed }">
      {{ todo.text }}
    </span>

    <button @click="emit('delete', todo.id)">
      Delete
    </button>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.item:last-child {
  border-bottom: none;
}

span {
  flex: 1;
}

.completed {
  color: #777;
  text-decoration: line-through;
}

button {
  border: none;
  background: transparent;
  color: #e53935;
  cursor: pointer;
}
</style>