<template>
  <section class="grid cols-2">
    <div class="card">
      <div class="card-inner">
        <div class="top">
          <h1 class="title">Kości</h1>
          <p class="muted">3D kostka: wybierz liczbę, postaw tokeny i rzuć.</p>
        </div>

        <div class="stage">
          <div class="scene">
            <div class="cube" :style="{ transform: cubeTransform }">
              <div v-for="f in 6" :key="f" class="face" :class="`f${f}`">
                <div class="pips">
                  <span v-for="i in 9" :key="i" class="pip" :class="{ on: facePips(f).includes(i - 1) }"></span>
                </div>
              </div>
            </div>
          </div>
          <div class="valuePill">
            <span class="material-symbols-rounded">casino</span>
            <span class="val">{{ value }}</span>
          </div>
        </div>

        <div class="controls">
          <div class="field">
            <label>Stawka</label>
            <input v-model.number="bet" class="input" type="number" min="1" step="1" />
          </div>

          <div class="field">
            <label>Typ</label>
            <select v-model.number="guess" class="input">
              <option v-for="n in 6" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <button class="btn btn-primary" :disabled="rolling" @click="roll">
            <span class="material-symbols-rounded">casino</span>
            <span>{{ rolling ? 'Rzucam…' : 'Rzuć' }}</span>
          </button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="last" class="result">
          <div class="row">
            <span class="muted">Wynik</span>
            <span class="big">{{ last.result }}</span>
          </div>
          <div class="row">
            <span class="muted">Payout</span>
            <span :class="last.payout > 0 ? 'pos' : 'neg'">{{ last.payout.toLocaleString('pl-PL') }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-inner">
        <h2 class="h2">Zasady</h2>
        <p class="muted">Jeśli trafisz liczbę, payout = <b>x6</b>. W innym przypadku 0.</p>
        <p class="muted small">Wizual: jedna kostka w 3D (CSS), obrót + ustawienie właściwej ścianki.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCasinoStore } from '../stores/casino.js'
import { useSessionStore } from '../stores/session.js'
import { clampInt } from '../utils/format.js'

const casino = useCasinoStore()
const session = useSessionStore()

const bet = ref(10)
const guess = ref(6)
const value = ref(1)
const rolling = ref(false)
const error = ref('')
const last = ref(null)

const spinX = ref(0)
const spinY = ref(0)

const orientation = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: 0, y: 180 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 },
}

const cubeTransform = computed(() => {
  const o = orientation[value.value] ?? orientation[1]
  return `rotateX(${spinX.value + o.x}deg) rotateY(${spinY.value + o.y}deg)`
})

function facePips(n) {
  // 9-cell grid indices:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const p = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8],
  }
  return p[n] ?? []
}

function roll() {
  if (rolling.value) return
  error.value = ''

  const me = session.me
  if (!me) {
    error.value = 'Zaloguj się, żeby grać.'
    return
  }

  const betInt = clampInt(bet.value, 1, 1_000_000)
  bet.value = betInt
  if (betInt > session.balance) {
    error.value = 'Brak tokenów na zakład.'
    return
  }

  const result = Math.floor(Math.random() * 6) + 1
  const guessInt = clampInt(guess.value, 1, 6)
  guess.value = guessInt
  const win = guessInt === result
  const payout = win ? betInt * 6 : 0

  rolling.value = true
  spinX.value += 360 * (2 + Math.floor(Math.random() * 2))
  spinY.value += 360 * (2 + Math.floor(Math.random() * 2))
  value.value = result

  window.setTimeout(() => {
    try {
      casino.placeRound({
        playerId: me.id,
        game: 'dice',
        action: 'roll',
        bet: betInt,
        payout,
        meta: { guess: guessInt, result },
      })
      last.value = { result, payout }
    } catch (e) {
      error.value = e?.message ?? 'Nie udało się rzucić.'
    } finally {
      rolling.value = false
    }
  }, 900)
}
</script>

<style scoped>
.top { display: grid; gap: 6px; }
.title { margin: 0; font-size: 26px; }

.stage {
  margin-top: 14px;
  display: grid;
  place-items: center;
  gap: 12px;
}

.scene {
  width: 160px;
  height: 160px;
  display: grid;
  place-items: center;
  perspective: 900px;
}

.cube {
  width: 90px;
  height: 90px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
}

.face {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.14);
  background:
    radial-gradient(circle at 30% 25%, rgba(255, 212, 106, 0.12), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.22));
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.35);
  backface-visibility: hidden;
}

.pips {
  position: absolute;
  inset: 14px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
}

.pip {
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: rgba(0,0,0,0.25);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.10);
  opacity: 0.22;
}

.pip.on {
  opacity: 1;
  background: radial-gradient(circle at 35% 35%, rgba(255,255,255,1), rgba(255,255,255,0.55));
  box-shadow: 0 8px 18px rgba(0,0,0,0.22), 0 0 18px rgba(255, 212, 106, 0.12);
}

.f1 { transform: rotateY(0deg) translateZ(45px); }
.f2 { transform: rotateY(90deg) translateZ(45px); }
.f3 { transform: rotateY(180deg) translateZ(45px); }
.f4 { transform: rotateY(-90deg) translateZ(45px); }
.f5 { transform: rotateX(90deg) translateZ(45px); }
.f6 { transform: rotateX(-90deg) translateZ(45px); }

.valuePill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 183, 3, 0.22);
  background: rgba(255, 183, 3, 0.10);
}

.val { font-variant-numeric: tabular-nums; font-weight: 800; }

.controls {
  margin-top: 14px;
  display: flex;
  align-items: end;
  gap: 10px;
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
.big { font-size: 18px; font-weight: 800; }
.pos { color: rgba(255, 212, 106, 0.95); }
.neg { color: rgba(255,255,255,0.78); }
.error { color: #ff9db5; margin: 10px 0 0; }

.h2 { margin: 0 0 12px; font-size: 18px; }
.small { font-size: 12px; margin: 12px 0 0; }
</style>
