<template>
  <div class="app-shell">
    <AppNavbar />
    <main class="app-main">
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <footer class="app-footer">
      <span class="muted">Red Royale Casino - lokalnie w przeglądarce</span>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.app-main {
  padding: 18px 16px 32px;
  width: min(1120px, 100%);
  margin: 0 auto;
}

.app-footer {
  padding: 18px 16px 28px;
  width: min(1120px, 100%);
  margin: 0 auto;
  opacity: 0.85;
}
</style>

