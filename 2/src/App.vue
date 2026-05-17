<script setup lang="ts">
import RegistrationForm from './components/RegistrationForm.vue'
</script>

<template>
  <main class="app">
    <RegistrationForm />
  </main>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-family: Arial, sans-serif;
  background: #f5f7fb;
}
</style>