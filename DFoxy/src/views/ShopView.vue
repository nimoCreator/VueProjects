<template>
  <section class="card stack" style="text-align:center">
    <h1>Sklep — Limitowana Edycja</h1>
    <p class="muted">Kup przez formularz Google. To zajmie chwile.</p>

    <div class="card" style="display:grid;gap:8px;justify-items:center">
      <div style="font-size:40px">💿</div>
      <strong>Limitowana plyta CD — DJ set</strong>
      <small class="muted">149 zl • numerowane + autograf</small>
      <a class="btn" href="https://forms.gle/3kQZgLSykWocPPuz5" target="_blank" rel="noopener">Przejdz do formularza</a>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name:'ShopView' })
</script>
