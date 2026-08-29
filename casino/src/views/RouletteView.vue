<template>
  <section class="grid cols-2">
    <div class="card">
      <div class="card-inner">
        <div class="top">
          <h1 class="title">Ruletka</h1>
          <p class="muted">Koło i kulka z animacją. Zakłady: kolor albo numer.</p>
        </div>

        <div class="stage">
          <div class="wheel-wrap">
            <div class="wheel" :style="{ '--r': `${wheelDeg}deg` }">
              <div class="ring"></div>
              <div
                v-for="n in numbers"
                :key="n"
                class="slot"
                :class="colorClass(n)"
                :style="{ '--i': n, '--color': colorOf(n)}"
              >
                <span class="slot-num">{{ n }}</span>
              </div>
            </div>
            <div class="ball" :style="{ '--br': `${ballDeg}`, '--bx': `${ballX}` }"></div>
          </div>
        </div>

        <div class="controls">
          <div class="field">
            <label>Stawka</label>
            <input v-model.number="bet" class="input" type="number" min="1" step="1" />
          </div>

          <div class="field">
            <label>Typ</label>
            <select v-model="betType" class="input">
              <option value="red">Czerwone</option>
              <option value="black">Czarne</option>
              <option value="number">Numer</option>
            </select>
          </div>

          <div v-if="betType === 'number'" class="field">
            <label>Numer (0–36)</label>
            <input v-model.number="betNumber" class="input" type="number" min="0" max="36" step="1" />
          </div>

          <button class="btn btn-primary" :disabled="spinning" @click="spin">
            <span class="material-symbols-rounded">refresh</span>
            <span>{{ spinning ? 'Kręcę…' : 'Spin' }}</span>
          </button>
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="last" class="result">
          <div class="row">
            <span class="muted">Wylosowano</span>
            <span class="pillRes" :class="colorClass(last.number)">{{ last.number }}</span>
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
        <ul class="rules">
          <li><span class="muted">Kolor</span>: wypłata <b>x2</b> (net +1x)</li>
          <li><span class="muted">Numer</span>: wypłata <b>x36</b> (net +35x)</li>
          <li><span class="muted">0</span> jest zielone</li>
        </ul>
        <p class="muted small">To mini-symulator (ładny), nie kasyno z prawdziwą fizyką.</p>
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

const numbers = Array.from({ length: 36 }, (_, i) => i)

const bet = ref(10)
const betType = ref('red')
const betNumber = ref(7)

const wheelDeg = ref(0)
const ballDeg = ref(0)
const ballX = ref(138)
const spinning = ref(false)
const error = ref('')
const last = ref(null)

const segmentAngle = computed(() => 360 / 37)

function colorOf(n) {
  if (n === 0) return 'green'
  return n%2 == 0 ? 'red' : 'black'
}

function colorClass(n) {
  return `is-${colorOf(Number(n))}`
}

function rand(min, max) {
  return Math.random() * (max - min) + min
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

  const result = Math.floor(Math.random() * 37)
  const resultAngle = result * segmentAngle.value

  const win =
    (betType.value === 'red' && colorOf(result) === 'red') ||
    (betType.value === 'black' && colorOf(result) === 'black') ||
    (betType.value === 'number' && clampInt(betNumber.value, 0, 36) === result)

  const payout = win ? (betType.value === 'number' ? betInt * 36 : betInt * 2) : 0

  const finalWheel = wheelDeg.value + 1440 + rand(-120, 120)
  const finalBall = finalWheel + resultAngle

  spinning.value = true
  wheelDeg.value = finalWheel
  ballDeg.value = finalBall

  window.setTimeout(() => {
    try {
      casino.placeRound({
        playerId: me.id,
        game: 'roulette',
        action: 'spin',
        bet: betInt,
        payout,
        meta: {
          betType: betType.value,
          betNumber: betType.value === 'number' ? clampInt(betNumber.value, 0, 36) : null,
          result,
          color: colorOf(result),
        },
      })
      last.value = { number: result, payout }
    } catch (e) {
      error.value = e?.message ?? 'Nie udało się zakręcić.'
    } finally {
      spinning.value = false
    }
  }, 4200)
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

.wheel-wrap {
  position: relative;
  width: 21.5rem;
  height: 21.5rem;
  --ballR: 138px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.wheel {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background:
    radial-gradient(circle at 35% 30%, rgba(255, 212, 106, 0.14), transparent 55%),
    radial-gradient(circle at 70% 70%, rgba(255, 0, 76, 0.18), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0.25));
  box-shadow: 0 24px 70px rgba(0,0,0,0.55), 0 20px 70px rgba(255, 0, 76, 0.10);
  transition: transform 4s cubic-bezier(0.12, 0.9, 0.15, 1);

  display: flex;
  align-items: center;
  justify-content: center;
  
  transform: rotate(var(--r, 0deg));
}

.ring {
  position: absolute;
  inset: 20px;
  border-radius: 999px;
  border: 1px solid #ffb7032e;
  box-shadow: inset 0 0 0 2px #0000008c;
  background: radial-gradient(circle at 50% 45%, #8edd0f41, #2ce2082c);
}

.slot {
  position: absolute;

  width: 2rem;
  height: 1.5rem;

  display: grid;
  place-items: center;


  
  border-top-left-radius: 0.175rem 2rem;
  border-top-right-radius: 0.175rem 2rem;
  corner-shape: bevel;

  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.22);

  transform: 
    rotate( calc(var(--i) * 10deg) ) 
    translateY(-10rem) 
    rotate( 180deg );
}

.slot-num {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.2px;
}

.is-red .slot-num { color: rgba(255, 78, 124, 0.98); }
.is-black .slot-num { color: rgba(255, 255, 255, 0.86); }
.is-green .slot-num { color: rgba(130, 255, 194, 0.90); }

.ball {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,1), rgba(255,255,255,0.6));
  box-shadow: 0 0 16px rgba(255,255,255,0.35), 0 0 28px rgba(255, 212, 106, 0.18);
  transition: transform 4s cubic-bezier(0.12, 0.9, 0.15, 1);

  transform:
    rotate( calc( var(--br, 0) * 1deg) )
    translateX( calc(var(--bx) * 1px) )
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

.row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.pillRes {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 30px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(0,0,0,0.22);
  font-variant-numeric: tabular-nums;
}

.pillRes.is-red { border-color: rgba(255, 0, 76, 0.30); }
.pillRes.is-black { border-color: rgba(255,255,255,0.14); }
.pillRes.is-green { border-color: rgba(130, 255, 194, 0.25); }

.pos { color: rgba(255, 212, 106, 0.95); }
.neg { color: rgba(255,255,255,0.78); }
.error { color: #ff9db5; margin: 10px 0 0; }

.h2 { margin: 0 0 12px; font-size: 18px; }
.rules { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
.small { font-size: 12px; margin: 12px 0 0; }
</style>

