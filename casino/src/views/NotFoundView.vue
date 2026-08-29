<template>
  <section class="card">
    <div class="card-inner">
      <h1 class="title">404</h1>
      <p class="muted">Nie ma takiej strony.</p>
      <RouterLink class="btn" to="/">
        <span class="material-symbols-rounded">home</span>
        <span>Wróć</span>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.title { margin: 0 0 6px; font-size: 26px; }
</style>

