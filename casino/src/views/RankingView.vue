<template>
  <section class="card">
    <div class="card-inner">
      <div class="top">
        <h1 class="title">Ranking</h1>
        <p class="muted">Top gracze wg ilości tokenów.</p>
      </div>

      <div v-if="players.length === 0" class="empty">
        <p class="muted">Brak graczy. Zarejestruj się jako pierwszy.</p>
        <RouterLink class="btn btn-primary" to="/register">
          <span class="material-symbols-rounded">person_add</span>
          <span>Rejestracja</span>
        </RouterLink>
      </div>

      <div v-else class="table">
        <div class="head">
          <span class="muted small">#</span>
          <span class="muted small">Handle</span>
          <span class="muted small right">Tokens</span>
          <span class="muted small right">Net</span>
          <span></span>
        </div>
        <div class="rows">
          <div v-for="(p, idx) in players" :key="p.id" class="row">
            <span class="rank">{{ idx + 1 }}</span>
            <span class="handle">{{ p.handle }}</span>
            <span class="right gold">{{ p.balance.toLocaleString('pl-PL') }}</span>
            <span class="right" :class="p.stats.net >= 0 ? 'pos' : 'neg'">{{ p.stats.net.toLocaleString('pl-PL') }}</span>
            <RouterLink class="btn btn-ghost btnSm" :to="{ name: 'profile', query: { handle: p.handle } }">
              <span class="material-symbols-rounded">person</span>
              <span>Profil</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCasinoStore } from '../stores/casino.js'

const casino = useCasinoStore()
const players = computed(() => casino.topPlayers)
</script>

<style scoped>
.top { display: grid; gap: 6px; }
.title { margin: 0; font-size: 26px; }
.small { font-size: 12px; }
.empty { margin-top: 14px; display: grid; gap: 10px; }

.table { margin-top: 14px; }

.head,
.row {
  display: grid;
  grid-template-columns: 48px 1fr 160px 160px auto;
  gap: 10px;
  align-items: center;
}

.head { padding: 8px 2px; }
.rows { display: grid; gap: 10px; }

.row {
  padding: 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}

.rank { font-weight: 900; font-variant-numeric: tabular-nums; }
.handle { font-weight: 800; letter-spacing: 0.2px; }
.right { text-align: right; font-variant-numeric: tabular-nums; }
.gold { color: rgba(255, 212, 106, 0.95); }
.pos { color: rgba(255, 212, 106, 0.95); }
.neg { color: rgba(255, 157, 181, 0.95); }

.btnSm { padding: 8px 10px; font-size: 13px; }

@media (max-width: 920px) {
  .head { display: none; }
  .row { grid-template-columns: 1fr auto; grid-auto-rows: auto; }
  .rank { display: none; }
  .right { text-align: left; }
}
</style>

