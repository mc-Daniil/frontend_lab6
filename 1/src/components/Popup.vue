<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click="emit('close')">
      <div class="popup" @click.stop>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.popup {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 6px;
  background: white;
  text-align: center;
}
</style>