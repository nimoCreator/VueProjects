<template>
  <section class="grid cols-2">
    <div class="card">
      <div class="card-inner">
        <div class="top">
          <h1 class="title">Daily Spin</h1>
          <p class="muted">Raz dziennie zakręć i zgarnij tokeny.</p>
        </div>

        <div class="stage">
          <div class="wheelWrap">
            <div class="wheel" :style="{ transform: `rotate(${wheelDeg}deg)` }">
              <div class="hub"></div>
              <div v-for="(r, idx) in rewards" :key="idx" class="seg" :style="segStyle(idx)">
                <span class="segLabel">{{ r.amount }}</span>
              </div>
            </div>
            <div class="pointer" aria-hidden="true"></div>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" type="button" :disabled="spinning || !canSpin" @click="spin">
            <span class="material-symbols-rounded">today</span>
            <span>{{ spinning ? 'Kręcę…' : canSpin ? 'Spin' : 'Zagraj jutro' }}</span>
          </button>

          <div v-if="!canSpin" class="muted small">
            Następny spin: {{ nextSpinLabel }}
          </div>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="last" class="result">
          <div class="row">
            <span class="muted">Wygrana</span>
            <span class="big">+{{ last.amount.toLocaleString('pl-PL') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-inner">
        <h2 class="h2">Nagrody</h2>
        <div class="list">
          <div v-for="(r, idx) in rewards" :key="idx" class="item">
            <span class="muted">Szansa</span>
            <span>{{ r.weight }}%</span>
            <span class="muted">Payout</span>
            <span class="gold">+{{ r.amount }}</span>
          </div>
        </div>
        <p class="muted small">Wynik losowany wagami (nie równo).</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCasinoStore } from '../stores/casino.js'
import { useSessionStore } from '../stores/session.js'
import { formatDateTime } from '../utils/format.js'

const casino = useCasinoStore()
const session = useSessionStore()

const rewards = [
  { amount: 50, weight: 30 },
  { amount: 100, weight: 25 },
  { amount: 200, weight: 20 },
  { amount: 400, weight: 15 },
  { amount: 800, weight: 8 },
  { amount: 1500, weight: 2 },
]

const wheelDeg = ref(0)
const spinning = ref(false)
const error = ref('')
const last = ref(null)

const segAngle = computed(() => 360 / rewards.length)

const me = computed(() => session.me)
const canSpin = computed(() => (me.value ? casino.canDailySpin(me.value.id) : false))

const nextSpinLabel = computed(() => {
  if (!me.value) return '—'
  const lastSpinAt = me.value.daily?.lastSpinAt ?? 0
  const next = startOfNextLocalDay(Math.max(Date.now(), lastSpinAt))
  return formatDateTime(next)
})

function startOfNextLocalDay(ms) {
  const d = new Date(ms)
  d.setHours(24, 0, 0, 0)
  return d.getTime()
}

function segStyle(idx) {
  const angle = idx * segAngle.value
  return { transform: `rotate(${angle}deg) translateY(-120px) rotate(${-angle}deg)` }
}

function weightedPickIndex() {
  const total = rewards.reduce((s, r) => s + r.weight, 0)
  let x = Math.random() * total
  for (let i = 0; i < rewards.length; i += 1) {
    x -= rewards[i].weight
    if (x <= 0) return i
  }
  return rewards.length - 1
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function spin() {
  if (spinning.value) return
  error.value = ''
  last.value = null

  const p = me.value
  if (!p) {
    error.value = 'Zaloguj się, żeby kręcić daily.'
    return
  }
  if (!casino.canDailySpin(p.id)) return

  const idx = weightedPickIndex()
  const amount = rewards[idx].amount

  const target = -idx * segAngle.value + rand(-segAngle.value * 0.42, segAngle.value * 0.42)
  const final = wheelDeg.value + 1440 + target

  spinning.value = true
  wheelDeg.value = final

  window.setTimeout(() => {
    try {
      casino.placeRound({
        playerId: p.id,
        game: 'daily',
        action: 'spin',
        bet: 0,
        payout: amount,
        meta: { amount },
      })
      casino.markDailySpin(p.id)
      last.value = { amount }
    } catch (e) {
      error.value = e?.message ?? 'Nie udało się wykonać daily.'
    } finally {
      spinning.value = false
    }
  }, 3200)
}
</script>

<style scoped>
.top { display: grid; gap: 6px; }
.title { margin: 0; font-size: 26px; }

.stage {
  margin-top: 14px;
  display: grid;
  place-items: center;
}

.wheelWrap {
  position: relative;
  width: 320px;
  height: 320px;
}

.wheel {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 212, 106, 0.12), transparent 55%),
    radial-gradient(circle at 70% 75%, rgba(255, 0, 76, 0.18), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.25));
  box-shadow: 0 24px 70px rgba(0,0,0,0.55), 0 20px 70px rgba(255, 0, 76, 0.10);
  transition: transform 3.2s cubic-bezier(0.12, 0.9, 0.15, 1);
}

.hub {
  position: absolute;
  inset: 118px;
  border-radius: 999px;
  border: 1px solid rgba(255, 183, 3, 0.18);
  background: radial-gradient(circle at 50% 45%, rgba(255,255,255,0.06), rgba(0,0,0,0.30));
  box-shadow: inset 0 0 0 2px rgba(0,0,0,0.55);
}

.seg {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90px;
  height: 26px;
  margin-left: -45px;
  margin-top: -13px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.22);
}

.segLabel {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 212, 106, 0.92);
  letter-spacing: -0.2px;
}

.pointer {
  position: absolute;
  left: 50%;
  top: -6px;
  width: 0;
  height: 0;
  margin-left: -9px;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 16px solid rgba(255, 212, 106, 0.95);
  filter: drop-shadow(0 8px 16px rgba(255, 212, 106, 0.18));
}

.controls {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.result {
  margin-top: 12px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}

.row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.big { font-size: 18px; font-weight: 900; color: rgba(255, 212, 106, 0.95); }
.error { color: #ff9db5; margin: 10px 0 0; }

.h2 { margin: 0 0 12px; font-size: 18px; }
.list { display: grid; gap: 10px; }
.item { display: grid; grid-template-columns: 1fr auto 1fr auto; gap: 8px 10px; padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.10); background: rgba(255,255,255,0.04); }
.gold { color: rgba(255, 212, 106, 0.95); font-variant-numeric: tabular-nums; }
.small { font-size: 12px; margin: 12px 0 0; }
</style>

