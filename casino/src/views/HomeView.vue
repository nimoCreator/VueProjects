<template>
  <section class="hero card">
    <div class="card-inner">
      <h1 class="title">Kasyno w przeglądarce</h1>
      <p class="lead muted">
        Nowoczesny, czerwono-złoty vibe, animacje i “tokeny” trzymane lokalnie w Pinia.
        Zarejestruj się i sprawdź szczęście w grach.
      </p>
      <div class="cta">
        <RouterLink class="btn btn-primary" to="/register">
          <span class="material-symbols-rounded">person_add</span>
          <span>Rejestracja</span>
        </RouterLink>
        <RouterLink class="btn" to="/login">
          <span class="material-symbols-rounded">login</span>
          <span>Logowanie</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="grid cols-3 section">
    <RouterLink class="game card" to="/slots">
      <div class="card-inner">
        <div class="game-top">
          <span class="material-symbols-rounded">casino</span>
          <span class="game-title">Slots</span>
        </div>
        <p class="muted">Jednoręki bandyta z animacją bębnów.</p>
      </div>
    </RouterLink>

    <RouterLink class="game card" to="/roulette">
      <div class="card-inner">
        <div class="game-top">
          <span class="material-symbols-rounded">restart_alt</span>
          <span class="game-title">Ruletka</span>
        </div>
        <p class="muted">Koło + kulka, jak w prawdziwej ruletce (prawie).</p>
      </div>
    </RouterLink>

    <RouterLink class="game card" to="/blackjack">
      <div class="card-inner">
        <div class="game-top">
          <span class="material-symbols-rounded">playing_cards</span>
          <span class="game-title">Blackjack</span>
        </div>
        <p class="muted">Talia 52 kart, rozdania, dobieranie i pas.</p>
      </div>
    </RouterLink>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.hero { margin-top: 12px; }
.title {
  margin: 0 0 8px;
  font-size: 34px;
  letter-spacing: -0.4px;
}
.lead { margin: 0; max-width: 70ch; }
.cta { display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap; }
.section { margin-top: 14px; }
.game { transition: transform 220ms var(--easeOut), border-color 220ms var(--easeOut); }
.game:hover { transform: translateY(-2px); border-color: rgba(255, 0, 76, 0.38); }
.game-top { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.game-title { letter-spacing: 0.2px; }
</style>

