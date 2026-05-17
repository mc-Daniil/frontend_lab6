<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>TodoList</h1>

      <nav class="nav">
        <RouterLink :to="{ name: 'tasks' }">
          Список задач
        </RouterLink>

        <RouterLink :to="{ name: 'add-task' }">
          Добавить задачу
        </RouterLink>

        <RouterLink :to="{ name: 'about' }">
          О нас
        </RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  padding: 40px;
  font-family: Arial, sans-serif;
  background: #f5f7fb;
}

.header {
  max-width: 700px;
  margin: 0 auto 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 400;
}

.nav {
  display: flex;
  gap: 12px;
}

.nav a {
  color: #2f80ed;
  text-decoration: none;
}

.nav a.router-link-active {
  font-weight: 700;
}

.main {
  max-width: 700px;
  margin: 0 auto;
}
</style>