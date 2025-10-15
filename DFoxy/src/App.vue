<template>
  <header class="site">
    <div class="container" style="padding:12px 0;">
      <div class="cluster">
        <strong>Dfoxy</strong>
      </div>
    </div>
  </header>

  <main>
    <div class="container stack">
      <Counter />
      <Navigation />
      <RouterView />
    </div>
  </main>

  <footer class="site">
      <small><a href="http://t.me/DfoxyPL">Dfoxy</a> 2025</small>
      <small class="muted"> by: <a href="https://nimoweb.ddns.net">nimo</a></small>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Counter from '@/components/Counter.vue'
import Navigation from '@/components/Navigation.vue'
export default defineComponent({ name: 'AppRoot', components: { Counter, Navigation } })
</script>

<style>
main {
  min-height: calc(100vh - 112px);
}
footer.site {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px 2rem;  
}
.cluster {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0 2rem;
}
</style>