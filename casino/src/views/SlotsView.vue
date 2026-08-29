<template>
  <section class="grid cols-2">
    <div class="card">
      <div class="card-inner">
        <div class="top">
          <h1 class="title">Slots</h1>
          <p class="muted">Jednoręki bandyta z bębnami 3D, betem i payoutem.</p>
        </div>

        <div class="machine">
          <div class="reels">
            <div v-for="r in 3" :key="r" class="reel-scene">
              <div class="reel" :style="reelStyle(r - 1)">
                <div v-for="(sym, i) in reelFaces" :key="i" class="face" :style="faceStyle(i)">
                  {{ sym }}
                </div>
              </div>
            </div>
          </div>
          <div class="payline" aria-hidden="true"></div>
        </div>

        <div class="controls">
          <div class="field">
            <label>Stawka</label>
            <input v-model.number="bet" class="input" type="number" min="1" step="1" />
          </div>

          <button class="btn btn-primary" :disabled="spinning" @click="spin">
            <span class="material-symbols-rounded">casino</span>
            <span>{{ spinning ? 'Spinning…' : 'Spin' }}</span>
          </button>

          <button class="btn btn-ghost" :disabled="spinning" type="button" @click="bet = 10">x10</button>
          <button class="btn btn-ghost" :disabled="spinning" type="button" @click="bet = 25">x25</button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="last" class="result">
          <div class="row">
            <span class="muted">Wynik</span>
            <span class="big">{{ last.symbols.join(' ') }}</span>
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
        <h2 class="h2">Paytable</h2>
        <div class="pay grid cols-2">
          <div v-for="(mult, sym) in paytable" :key="sym" class="pay-item">
            <span class="sym">{{ sym }}</span>
            <span class="muted">x{{ mult }}</span>
          </div>
        </div>
        <p class="muted small">3 takie same = wypłata wg x. 2 takie same = x2. Inaczej 0.</p>
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
const error = ref('')
const spinning = ref(false)
const last = ref(null)

const reelFaces = ['🍒', '🍋', '🍇', '🔔', '⭐', '🍀', '💎', '7️⃣', '🍒', '🍋', '🍇', '⭐']
const faceCount = reelFaces.length
const faceAngle = 360 / faceCount
const faceRadiusPx = 70

const rotations = ref([0, 0, 0])
const indices = ref([0, 0, 0])

const paytable = computed(() => ({
  '7️⃣': 12,
  '💎': 8,
  '⭐': 6,
  '🔔': 5,
  '🍀': 4,
  '🍇': 3,
  '🍋': 2,
  '🍒': 2,
}))

function reelStyle(reelIndex) {
  return { transform: `rotateX(${rotations.value[reelIndex]}deg)` }
}

function faceStyle(i) {
  return { transform: `rotateX(${i * faceAngle}deg) translateZ(${faceRadiusPx}px) translateX( calc(var(--xOffset) * 110px) )` }
}

function pickIndex() {
  return Math.floor(Math.random() * faceCount)
}

function calcPayout(betInt, symbols) {
  const [a, b, c] = symbols
  if (a === b && b === c) {
    const mult = paytable.value[a] ?? 0
    return { payout: betInt * mult, rule: 'triple', mult }
  }
  if (a === b || a === c || b === c) return { payout: betInt * 2, rule: 'double', mult: 2 }
  return { payout: 0, rule: 'none', mult: 0 }
}

function spin() {
  if (spinning.value) return
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

  const nextIndices = [pickIndex(), pickIndex(), pickIndex()]
  const symbols = nextIndices.map((i) => reelFaces[i])
  const { payout, rule, mult } = calcPayout(betInt, symbols)

  spinning.value = true
  for (let r = 0; r < 3; r += 1) {
    const extraTurns = 3 + r
    const deltaIndex = nextIndices[r] - indices.value[r]
    rotations.value[r] -= extraTurns * 360 + deltaIndex * faceAngle
    indices.value[r] = nextIndices[r]
  }

  window.setTimeout(() => {
    try {
      casino.placeRound({
        playerId: me.id,
        game: 'slots',
        action: 'spin',
        bet: betInt,
        payout,
        meta: { symbols, rule, mult },
      })
      last.value = { symbols, payout }
    } catch (e) {
      error.value = e?.message ?? 'Nie udało się wykonać spina.'
    } finally {
      spinning.value = false
    }
  }, 1200)
}
</script>

<style scoped>
.top { display: grid; gap: 6px; }
.title { margin: 0; font-size: 26px; }

.machine {
  margin-top: 14px;
  position: relative;
  padding: 18px;
  border-radius: 20px;
  border: 1px solid rgba(255, 0, 76, 0.22);
  background:
    radial-gradient(300px 200px at 50% 30%, rgba(255, 183, 3, 0.18), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.18));
  box-shadow: 0 18px 60px rgba(255, 0, 76, 0.12);
}

.reels {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  height: 110px;

  display: flex;
  justify-content: center;
  align-items: center;
  
  position: relative;
  transform-style: preserve-3d;
}

.reel-scene {
  position: absolute;

  width: 110px;
  height: 40px;
  perspective: 900px;
}

.reel {
  width: 100%;
  height: 2.5rem;

  position: absolute;

  transform-style: preserve-3d;

  transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1);
}
.reel-scene:nth-child(1) {
  --xOffset: -1;
}
.reel-scene:nth-child(2) {
  --xOffset: 0;
}
.reel-scene:nth-child(3) {
  --xOffset: 1;
}

.face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 20px;
  border-radius: 2px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.22);
  box-shadow: inset 0 0 0 1px rgba(255, 183, 3, 0.10);
  backface-visibility: hidden;
}

.payline {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 50%;
  height: 2px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, transparent, rgba(255, 212, 106, 0.9), transparent);
  box-shadow: 0 0 18px rgba(255, 212, 106, 0.35);
  pointer-events: none;
}

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

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.big { font-size: 22px; }
.pos { color: rgba(255, 212, 106, 0.95); }
.neg { color: rgba(255,255,255,0.78); }
.error { color: #ff9db5; margin: 10px 0 0; }

.h2 { margin: 0 0 12px; font-size: 18px; }
.pay-item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.10); background: rgba(255,255,255,0.04); }
.sym { font-size: 20px; }
.small { font-size: 12px; }
</style>

