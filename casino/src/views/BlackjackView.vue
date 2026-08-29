<template>
  <section class="card">
    <div class="card-inner">
      <div class="top">
        <h1 class="title">Blackjack</h1>
        <p class="muted">Dobij do 21. Dealer dobiera do 17. Blackjack = 3:2.</p>
      </div>

      <div class="table">
        <div class="hand">
          <div class="handTop">
            <span class="muted">Dealer</span>
            <span class="score">{{ dealerScoreLabel }}</span>
          </div>
          <div class="cards">
            <div
              v-for="(c, idx) in dealer"
              :key="c.id"
              class="cardUi"
              :class="cardClass(c)"
            >
              <template v-if="hideHoleCard && idx === 1">
                <div class="cardBack"></div>
              </template>
              <template v-else>
                <div class="corner">
                  <div class="rank">{{ c.rank }}</div>
                  <div class="suit">{{ suitSymbol(c.suit) }}</div>
                </div>
                <div class="centerSuit">{{ suitSymbol(c.suit) }}</div>
              </template>
            </div>
          </div>
        </div>

        <div class="hand">
          <div class="handTop">
            <span class="muted">Ty</span>
            <span class="score">{{ playerScore }}</span>
          </div>
          <div class="cards">
            <div v-for="c in player" :key="c.id" class="cardUi" :class="cardClass(c)">
              <div class="corner">
                <div class="rank">{{ c.rank }}</div>
                <div class="suit">{{ suitSymbol(c.suit) }}</div>
              </div>
              <div class="centerSuit">{{ suitSymbol(c.suit) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="field">
          <label>Stawka</label>
          <input v-model.number="bet" class="input" type="number" min="1" step="1" :disabled="inRound" />
        </div>

        <button class="btn btn-primary" type="button" :disabled="inRound" @click="deal">
          <span class="material-symbols-rounded">style</span>
          <span>Deal</span>
        </button>

        <button class="btn" type="button" :disabled="!canHit" @click="hit">
          <span class="material-symbols-rounded">add</span>
          <span>Hit</span>
        </button>
        <button class="btn" type="button" :disabled="!canStand" @click="stand">
          <span class="material-symbols-rounded">pan_tool</span>
          <span>Stand</span>
        </button>

        <button class="btn btn-ghost" type="button" :disabled="inRound" @click="bet = 25">x25</button>
        <button class="btn btn-ghost" type="button" :disabled="inRound" @click="bet = 100">x100</button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="message" class="message">{{ message }}</p>

      <div v-if="last" class="result">
        <div class="row">
          <span class="muted">Outcome</span>
          <span class="big">{{ last.outcome }}</span>
        </div>
        <div class="row">
          <span class="muted">Payout</span>
          <span :class="last.payout > 0 ? 'pos' : 'neg'">{{ last.payout.toLocaleString('pl-PL') }}</span>
        </div>
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

const bet = ref(25)
const status = ref('idle') // idle | player | finished
const error = ref('')
const message = ref('')
const last = ref(null)

const deck = ref([])
const player = ref([])
const dealer = ref([])

const inRound = computed(() => status.value === 'player')
const hideHoleCard = computed(() => status.value === 'player')

const playerScore = computed(() => handValue(player.value))
const dealerScore = computed(() => handValue(dealer.value))
const dealerScoreLabel = computed(() => (hideHoleCard.value ? `${cardValue(dealer.value[0])} + ?` : dealerScore.value))

const canHit = computed(() => status.value === 'player' && playerScore.value < 21)
const canStand = computed(() => status.value === 'player')

const SUITS = ['S', 'H', 'D', 'C']
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function suitSymbol(s) {
  return s === 'S' ? '♠' : s === 'H' ? '♥' : s === 'D' ? '♦' : '♣'
}

function isRedSuit(s) {
  return s === 'H' || s === 'D'
}

function cardClass(c) {
  return { red: isRedSuit(c.suit) }
}

function newDeck() {
  const cards = []
  for (const s of SUITS) {
    for (const r of RANKS) cards.push({ id: `${s}${r}-${Math.random().toString(16).slice(2)}`, suit: s, rank: r })
  }
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

function cardValue(c) {
  if (!c) return 0
  if (c.rank === 'A') return 11
  if (['K', 'Q', 'J'].includes(c.rank)) return 10
  return Number(c.rank)
}

function handValue(hand) {
  let total = 0
  let aces = 0
  for (const c of hand) {
    total += cardValue(c)
    if (c.rank === 'A') aces += 1
  }
  while (total > 21 && aces > 0) {
    total -= 10
    aces -= 1
  }
  return total
}

function isBlackjack(hand) {
  return hand.length === 2 && handValue(hand) === 21
}

function draw(to) {
  const c = deck.value.pop()
  if (!c) throw new Error('Brak kart w talii.')
  to.push(c)
}

function resetRound() {
  deck.value = newDeck()
  player.value = []
  dealer.value = []
  message.value = ''
  error.value = ''
  last.value = null
}

function deal() {
  if (inRound.value) return
  error.value = ''
  message.value = ''

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

  resetRound()
  draw(player.value)
  draw(dealer.value)
  draw(player.value)
  draw(dealer.value)
  status.value = 'player'

  // Immediate blackjack checks
  const pBJ = isBlackjack(player.value)
  const dBJ = isBlackjack(dealer.value)
  if (pBJ || dBJ) finishRound(betInt, pBJ, dBJ)
}

function hit() {
  if (!canHit.value) return
  draw(player.value)
  if (playerScore.value > 21) finishRound(clampInt(bet.value, 1, 1_000_000), false, false)
}

function stand() {
  if (!canStand.value) return
  const betInt = clampInt(bet.value, 1, 1_000_000)

  // Dealer plays
  while (handValue(dealer.value) < 17) draw(dealer.value)
  finishRound(betInt, false, false)
}

function finishRound(betInt, pBJ, dBJ) {
  const me = session.me
  if (!me) return

  const pVal = handValue(player.value)
  const dVal = handValue(dealer.value)

  let outcome = 'LOSE'
  let payout = 0

  if (pBJ && dBJ) {
    outcome = 'PUSH'
    payout = betInt
  } else if (pBJ) {
    outcome = 'BLACKJACK'
    payout = betInt + Math.floor(betInt * 1.5)
  } else if (dBJ) {
    outcome = 'LOSE'
    payout = 0
  } else if (pVal > 21) {
    outcome = 'BUST'
    payout = 0
  } else if (dVal > 21) {
    outcome = 'WIN'
    payout = betInt * 2
  } else if (pVal > dVal) {
    outcome = 'WIN'
    payout = betInt * 2
  } else if (pVal === dVal) {
    outcome = 'PUSH'
    payout = betInt
  } else {
    outcome = 'LOSE'
    payout = 0
  }

  status.value = 'finished'

  try {
    casino.placeRound({
      playerId: me.id,
      game: 'blackjack',
      action: 'hand',
      bet: betInt,
      payout,
      meta: {
        outcome,
        player: player.value.map(({ suit, rank }) => ({ suit, rank })),
        dealer: dealer.value.map(({ suit, rank }) => ({ suit, rank })),
        playerValue: pVal,
        dealerValue: dVal,
      },
    })
    last.value = { outcome, payout }
    message.value = outcome === 'WIN' ? 'Wygrana!' : outcome === 'PUSH' ? 'Push.' : 'Przegrana.'
  } catch (e) {
    error.value = e?.message ?? 'Nie udało się zakończyć rozdania.'
  }
}
</script>

<style scoped>
.top { display: grid; gap: 6px; }
.title { margin: 0; font-size: 26px; }

.table {
  margin-top: 14px;
  display: grid;
  gap: 14px;
}

.hand {
  padding: 12px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.14);
}

.handTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
}

.score {
  font-variant-numeric: tabular-nums;
  font-weight: 800;
  color: rgba(255, 212, 106, 0.95);
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cardUi {
  width: 78px;
  height: 108px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.16);
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 212, 106, 0.10), transparent 55%),
    linear-gradient(180deg, rgba(255,255,255,0.10), rgba(0,0,0,0.22));
  position: relative;
  box-shadow: 0 14px 28px rgba(0,0,0,0.35);
  overflow: hidden;
}

.cardUi.red { border-color: rgba(255, 0, 76, 0.25); }

.corner {
  position: absolute;
  left: 10px;
  top: 10px;
  display: grid;
  gap: 2px;
  font-weight: 800;
}

.rank { font-size: 14px; }
.suit { font-size: 14px; }
.cardUi.red .rank,
.cardUi.red .suit,
.cardUi.red .centerSuit { color: rgba(255, 78, 124, 0.98); }

.centerSuit {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 30px;
  color: rgba(255,255,255,0.86);
}

.cardBack {
  position: absolute;
  inset: 10px;
  border-radius: 12px;
  border: 1px solid rgba(255, 183, 3, 0.22);
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 0, 76, 0.40), transparent 55%),
    repeating-linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 6px, rgba(0,0,0,0.10) 6px, rgba(0,0,0,0.10) 12px);
}

.controls {
  margin-top: 14px;
  display: flex;
  align-items: end;
  gap: 10px;
  flex-wrap: wrap;
}

.error { color: #ff9db5; margin: 10px 0 0; }
.message { margin: 10px 0 0; color: rgba(255,255,255,0.86); }

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
</style>

