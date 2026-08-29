import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { randomId } from '../utils/crypto.js'

const INITIAL_BANKROLL = 1_000

function normalizeHandle(handle) {
  return String(handle ?? '')
    .trim()
    .replace(/\s+/g, '')
}

function handleKey(handle) {
  return normalizeHandle(handle).toLowerCase()
}

function assertHandleOk(handle) {
  const h = normalizeHandle(handle)
  if (!h) throw new Error('Podaj handle.')
  if (h.length < 3) throw new Error('Handle musi mieć min. 3 znaki.')
  if (h.length > 18) throw new Error('Handle może mieć max. 18 znaków.')
  if (!/^[a-zA-Z0-9_]+$/.test(h)) throw new Error('Handle: tylko litery/cyfry/_')
  return h
}

function assertAmountOk(amount, label = 'Kwota') {
  const n = Number(amount)
  if (!Number.isFinite(n)) throw new Error(`${label}: nieprawidłowa liczba.`)
  if (n <= 0) throw new Error(`${label}: musi być > 0.`)
  return Math.floor(n)
}

export const useCasinoStore = defineStore('casino', () => {
  const schemaVersion = ref(1)
  const players = ref([])
  const transactions = ref([])

  const playersById = computed(() => new Map(players.value.map((p) => [p.id, p])))
  const playersByHandle = computed(() => new Map(players.value.map((p) => [p.handleKey, p])))

  const topPlayers = computed(() => {
    return [...players.value]
      .sort((a, b) => (b.balance ?? 0) - (a.balance ?? 0))
      .slice(0, 50)
  })

  function getPlayerById(id) {
    if (!id) return null
    return playersById.value.get(id) ?? null
  }

  function getPlayerByHandle(handle) {
    const key = handleKey(handle)
    return playersByHandle.value.get(key) ?? null
  }

  function ensurePlayer(id) {
    const p = getPlayerById(id)
    if (!p) throw new Error('Brak użytkownika.')
    return p
  }

  function registerPlayer({ handle, passwordHash }) {
    const clean = assertHandleOk(handle)
    const key = handleKey(clean)
    if (getPlayerByHandle(key)) throw new Error('Taki handle już istnieje.')
    if (!passwordHash) throw new Error('Brak hasła.')

    const now = Date.now()
    const player = {
      id: randomId(),
      handle: clean,
      handleKey: key,
      passwordHash,
      createdAt: now,
      balance: INITIAL_BANKROLL,
      daily: { lastSpinAt: 0 },
      stats: {
        wagered: 0,
        won: 0,
        net: 0,
        games: {
          slots: { played: 0, wagered: 0, won: 0, net: 0 },
          roulette: { played: 0, wagered: 0, won: 0, net: 0 },
          dice: { played: 0, wagered: 0, won: 0, net: 0 },
          blackjack: { played: 0, wagered: 0, won: 0, net: 0 },
          daily: { played: 0, wagered: 0, won: 0, net: 0 },
        },
      },
    }

    players.value.push(player)

    // Initial credit transaction (optional, but nice for history).
    transactions.value.unshift({
      id: randomId(),
      playerId: player.id,
      handle: player.handle,
      game: 'system',
      action: 'initial_bankroll',
      bet: 0,
      payout: INITIAL_BANKROLL,
      delta: INITIAL_BANKROLL,
      balanceBefore: 0,
      balanceAfter: INITIAL_BANKROLL,
      createdAt: now,
      meta: { reason: 'welcome' },
    })

    return player
  }

  function placeRound({ playerId, game, action, bet = 0, payout = 0, meta = {} }) {
    const p = ensurePlayer(playerId)

    const betInt = bet ? assertAmountOk(bet, 'Stawka') : 0
    const payoutInt = payout ? Math.floor(Number(payout)) : 0
    if (payoutInt < 0) throw new Error('Payout: musi być >= 0.')

    if (betInt > 0 && p.balance < betInt) throw new Error('Brak tokenów na zakład.')

    const before = p.balance
    const delta = payoutInt - betInt
    const after = before + delta

    p.balance = after

    const gameKey = String(game ?? 'unknown')
    const g = p.stats.games?.[gameKey]
    if (g) {
      g.played += 1
      g.wagered += betInt
      g.won += payoutInt
      g.net += delta
    }
    p.stats.wagered += betInt
    p.stats.won += payoutInt
    p.stats.net += delta

    const tx = {
      id: randomId(),
      playerId: p.id,
      handle: p.handle,
      game: gameKey,
      action: String(action ?? 'round'),
      bet: betInt,
      payout: payoutInt,
      delta,
      balanceBefore: before,
      balanceAfter: after,
      createdAt: Date.now(),
      meta,
    }
    transactions.value.unshift(tx)
    return tx
  }

  function canDailySpin(playerId) {
    const p = ensurePlayer(playerId)
    const last = p.daily?.lastSpinAt ?? 0
    const now = Date.now()
    return !isSameLocalDay(last, now)
  }

  function markDailySpin(playerId) {
    const p = ensurePlayer(playerId)
    p.daily.lastSpinAt = Date.now()
  }

  function isSameLocalDay(aMs, bMs) {
    const a = new Date(aMs)
    const b = new Date(bMs)
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
  }

  function getTransactionsForPlayer(playerId, limit = 200) {
    return transactions.value.filter((t) => t.playerId === playerId).slice(0, limit)
  }

  return {
    schemaVersion,
    players,
    transactions,

    topPlayers,

    getPlayerById,
    getPlayerByHandle,
    registerPlayer,
    placeRound,
    canDailySpin,
    markDailySpin,
    getTransactionsForPlayer,
  }
})

