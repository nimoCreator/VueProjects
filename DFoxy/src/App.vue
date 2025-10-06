<template>
  <header class="site">
    <div class="container" style="padding:12px 0;">
      <div class="cluster" style="justify-content:space-between;">
        <strong>DFoxy</strong>
      </div>
    </div>
  </header>

  <main>
    <div class="container stack">
      <Counter/>
      <Navigation/>
      <RouterView/>
    </div>
  </main>

  <footer class="site">
    <div class="container" style="padding:12px 0;display:flex;gap:8px;justify-content:space-between;align-items:center;">
      <small><a href="http://t.me/DfoxyPL">DFoxy</a></small>
      <small class="muted">2025 • by <a href="https://nimoweb.ddns.net">nimo</a></small>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Counter from '@/components/Counter.vue'
import Navigation from '@/components/Navigation.vue'
export default defineComponent({ name:'AppRoot', components:{ Counter, Navigation } })
</script>

<style>
  
  main {
    min-height: calc(100vh - 112px);
  }
</style>