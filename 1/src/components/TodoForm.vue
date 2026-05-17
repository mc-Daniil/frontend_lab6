<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  add: [text: string]
}>()

const text = ref('')

const submit = () => {
  const value = text.value.trim()

  if (!value) {
    return
  }

  emit('add', value)
  text.value = ''
}
</script>

<template>
  <form class="form" @submit.prevent="submit">
    <input v-model="text" placeholder="New Task" />
    <button>Add</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  gap: 16px;
}

input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 4px;
  background: #2f80ed;
  color: white;
  cursor: pointer;
}
</style>