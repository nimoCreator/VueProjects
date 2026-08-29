<template>
  <section class="grid cols-2">
    <div class="card">
      <div class="card-inner">
        <div class="top">
          <h1 class="title">Profil</h1>
          <p class="muted">/profile?handle=... — historia i statystyki.</p>
        </div>

        <div v-if="!player" class="empty">
          <p class="muted">Nie znaleziono użytkownika.</p>
          <RouterLink class="btn" to="/ranking">
            <span class="material-symbols-rounded">leaderboard</span>
            <span>Ranking</span>
          </RouterLink>
        </div>

        <template v-else>
          <div class="who">
            <div class="whoLeft">
              <span class="material-symbols-rounded">account_circle</span>
              <div>
                <div class="handle">{{ player.handle }}</div>
                <div class="muted small">Utworzono: {{ formatDateTime(player.createdAt) }}</div>
              </div>
            </div>
            <div class="balance">
              <span class="material-symbols-rounded">paid</span>
              <span class="bal">{{ player.balance.toLocaleString('pl-PL') }}</span>
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="muted small">Wagered</div>
              <div class="num">{{ player.stats.wagered.toLocaleString('pl-PL') }}</div>
            </div>
            <div class="stat">
              <div class="muted small">Won</div>
              <div class="num">{{ player.stats.won.toLocaleString('pl-PL') }}</div>
            </div>
            <div class="stat">
              <div class="muted small">Net</div>
              <div class="num" :class="player.stats.net >= 0 ? 'pos' : 'neg'">
                {{ player.stats.net.toLocaleString('pl-PL') }}
              </div>
            </div>
          </div>

          <h2 class="h2">Ostatnie transakcje</h2>
          <div class="txHead">
            <span class="muted small">Czas</span>
            <span class="muted small">Gra</span>
            <span class="muted small right">Bet</span>
            <span class="muted small right">Payout</span>
            <span class="muted small right">Saldo</span>
          </div>
          <div class="txList">
            <div v-for="t in tx" :key="t.id" class="txRow">
              <span class="small">{{ formatDateTime(t.createdAt) }}</span>
              <span class="tag">{{ t.game }}</span>
              <span class="right">{{ t.bet.toLocaleString('pl-PL') }}</span>
              <span class="right" :class="t.payout > 0 ? 'pos' : 'muted'">{{ t.payout.toLocaleString('pl-PL') }}</span>
              <span class="right">{{ t.balanceAfter.toLocaleString('pl-PL') }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="card">
      <div class="card-inner">
        <h2 class="h2">Wykres salda</h2>
        <SparklineChart :values="balanceSeries" label="Saldo użytkownika w czasie" />
        <div v-if="balanceMeta" class="chartMeta">
          <div class="metaItem">
            <div class="muted small">Start</div>
            <div class="num">{{ balanceMeta.start.toLocaleString('pl-PL') }}</div>
          </div>
          <div class="metaItem">
            <div class="muted small">Min</div>
            <div class="num">{{ balanceMeta.min.toLocaleString('pl-PL') }}</div>
          </div>
          <div class="metaItem">
            <div class="muted small">Max</div>
            <div class="num">{{ balanceMeta.max.toLocaleString('pl-PL') }}</div>
          </div>
          <div class="metaItem">
            <div class="muted small">Teraz</div>
            <div class="num" :class="balanceMeta.change >= 0 ? 'pos' : 'neg'">
              {{ balanceMeta.end.toLocaleString('pl-PL') }}
            </div>
          </div>
        </div>

        <h2 class="h2">Stats by game</h2>
        <div v-if="player" class="gameStats">
          <div v-for="(g, key) in player.stats.games" :key="key" class="gRow">
            <div class="gKey">{{ key }}</div>
            <div class="muted small">played: <span class="mono">{{ g.played.toLocaleString('pl-PL') }}</span></div>
            <div class="muted small">wagered: <span class="mono">{{ g.wagered.toLocaleString('pl-PL') }}</span></div>
            <div class="muted small">won: <span class="mono">{{ g.won.toLocaleString('pl-PL') }}</span></div>
            <div class="muted small">
              net: <span class="mono" :class="g.net >= 0 ? 'pos' : 'neg'">{{ g.net.toLocaleString('pl-PL') }}</span>
            </div>
          </div>
        </div>
        <p v-else class="muted">Zaloguj się lub przejdź z rankingu na profil.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useCasinoStore } from '../stores/casino.js'
import { useSessionStore } from '../stores/session.js'
import { formatDateTime } from '../utils/format.js'
import SparklineChart from '../components/SparklineChart.vue'

const route = useRoute()
const casino = useCasinoStore()
const session = useSessionStore()

const handleParam = computed(() => (typeof route.query.handle === 'string' ? route.query.handle : ''))

const player = computed(() => {
  if (handleParam.value) return casino.getPlayerByHandle(handleParam.value)
  return session.me
})

const tx = computed(() => (player.value ? casino.getTransactionsForPlayer(player.value.id, 60) : []))
const txChart = computed(() => (player.value ? casino.getTransactionsForPlayer(player.value.id, 240) : []))

const balanceSeries = computed(() => {
  if (!player.value) return []
  const chron = [...txChart.value].reverse()
  if (chron.length === 0) return []
  const series = []
  const first = chron[0]
  if (typeof first.balanceBefore === 'number') series.push(first.balanceBefore)
  for (const t of chron) series.push(t.balanceAfter)
  return series
})

const balanceMeta = computed(() => {
  const s = balanceSeries.value
  if (s.length < 2) return null
  let min = s[0]
  let max = s[0]
  for (const n of s) {
    if (n < min) min = n
    if (n > max) max = n
  }
  const start = s[0]
  const end = s[s.length - 1]
  return { start, end, min, max, change: end - start }
})
</script>

<style scoped>
.top { display: grid; gap: 6px; }
.title { margin: 0; font-size: 26px; }

.empty { margin-top: 14px; display: grid; gap: 10px; }

.who {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.14);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.whoLeft { display: flex; align-items: center; gap: 10px; }
.handle { font-weight: 900; letter-spacing: 0.2px; }
.small { font-size: 12px; }

.balance {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 183, 3, 0.25);
  background: rgba(255, 183, 3, 0.10);
}

.bal { font-variant-numeric: tabular-nums; font-weight: 900; color: rgba(255, 212, 106, 0.95); }

.stats {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stat {
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}

.num { font-weight: 900; font-variant-numeric: tabular-nums; }
.pos { color: rgba(255, 212, 106, 0.95); }
.neg { color: rgba(255, 157, 181, 0.95); }

.h2 { margin: 14px 0 10px; font-size: 18px; }

.txHead,
.txRow {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.6fr 0.7fr 0.7fr;
  gap: 10px;
  align-items: center;
}

.txHead { padding: 8px 2px; }
.txList { display: grid; gap: 8px; }
.txRow {
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}

.right { text-align: right; font-variant-numeric: tabular-nums; }
.tag { font-size: 12px; padding: 4px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.12); background: rgba(0,0,0,0.18); width: fit-content; }

.gameStats { display: grid; gap: 10px; }
.gRow { padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.10); background: rgba(255,255,255,0.04); display: grid; gap: 6px; }
.gKey { font-weight: 900; letter-spacing: 0.2px; }
.mono { font-variant-numeric: tabular-nums; }

.chartMeta {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.metaItem {
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}

@media (max-width: 920px) {
  .stats { grid-template-columns: 1fr; }
  .txHead, .txRow { grid-template-columns: 1fr 1fr; }
  .right { text-align: left; }
  .chartMeta { grid-template-columns: 1fr 1fr; }
}
</style>
