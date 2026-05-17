<script setup lang="ts">
type Props = {
  text: string
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="overlay" @click.self="emit('close')">
    <div class="modal">
      <h2>License agreement</h2>

      <p>{{ text }}</p>

      <button type="button" @click="emit('close')">
        Close
      </button>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.45);
}

.modal {
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border-radius: 12px;
  background: white;
}

h2 {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 400;
}

p {
  margin: 0 0 24px;
  line-height: 1.5;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  background: #2f80ed;
  color: white;
  cursor: pointer;
}
</style>