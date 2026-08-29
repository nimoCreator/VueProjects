import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { sha256 } from '../utils/crypto.js'
import { useCasinoStore } from './casino.js'

function assertPasswordOk(password) {
  const p = String(password ?? '')
  if (!p) throw new Error('Podaj hasło.')
  if (p.length < 4) throw new Error('Hasło musi mieć min. 4 znaki.')
  return p
}

export const useSessionStore = defineStore('session', () => {
  const casino = useCasinoStore()
  const currentPlayerId = ref(null)

  const me = computed(() => casino.getPlayerById(currentPlayerId.value))
  const isLoggedIn = computed(() => !!me.value)
  const handle = computed(() => me.value?.handle ?? 'Gość')
  const balance = computed(() => me.value?.balance ?? 0)

  async function register(handleInput, passwordInput) {
    const password = assertPasswordOk(passwordInput)
    const passwordHash = await sha256(password)

    const player = casino.registerPlayer({ handle: handleInput, passwordHash })
    currentPlayerId.value = player.id
    return player
  }

  async function login(handleInput, passwordInput) {
    const password = assertPasswordOk(passwordInput)
    const player = casino.getPlayerByHandle(handleInput)
    if (!player) throw new Error('Nie ma takiego handle.')

    const passwordHash = await sha256(password)
    if (player.passwordHash !== passwordHash) throw new Error('Złe hasło.')

    currentPlayerId.value = player.id
    return player
  }

  function logout() {
    currentPlayerId.value = null
  }

  return {
    currentPlayerId,
    me,
    isLoggedIn,
    handle,
    balance,
    register,
    login,
    logout,
  }
})

