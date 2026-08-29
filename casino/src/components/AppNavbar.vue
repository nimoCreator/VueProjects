<template>
  <header class="nav">
    <div class="nav-inner">
      <RouterLink class="brand" to="/">
        <span class="brand-dot material-symbols-rounded" aria-hidden="true">poker_chip</span>
        <span>Royal Flush Casino</span>
      </RouterLink>

      <nav class="links" aria-label="Nawigacja">
        <RouterLink class="link" to="/slots">
          <span class="material-symbols-rounded">view_column</span><span>Slots</span>
        </RouterLink>
        <RouterLink class="link" to="/roulette">
          <span class="material-symbols-rounded">circle_circle</span><span>Ruletka</span>
        </RouterLink>
        <RouterLink class="link" to="/dice">
          <span class="material-symbols-rounded">casino</span><span>Kości</span>
        </RouterLink>
        <RouterLink class="link" to="/blackjack">
          <span class="material-symbols-rounded">playing_cards</span><span>Blackjack</span>
        </RouterLink>
        <RouterLink class="link" to="/daily">
          <span class="material-symbols-rounded">today</span><span>Daily</span>
        </RouterLink>
        <RouterLink class="link" to="/ranking">
          <span class="material-symbols-rounded">trophy</span><span>Ranking</span>
        </RouterLink>
      </nav>

      <div class="right">
        <button
          class="iconBtn menuBtn"
          type="button"
          aria-label="Otwórz menu"
          :aria-expanded="menuOpen ? 'true' : 'false'"
          aria-controls="mobile-nav"
          @click="openMenu"
        >
          <span class="material-symbols-rounded">menu</span>
        </button>

        <div class="pill saldo" title="Stan konta (tokens)">
          <span class="material-symbols-rounded icon">poker_chip</span>
          <span class="pill-val">{{ session.balance.toLocaleString('pl-PL') }}</span>
        </div>

        <RouterLink v-if="!session.isLoggedIn" class="user" to="/login" title="Logowanie">
          <span class="material-symbols-rounded">login</span>
          <span class="user-handle">Zaloguj</span>
        </RouterLink>
        <RouterLink v-else class="user" :to="profileLink" :title="`Profil ${session.handle}`">
          <span class="material-symbols-rounded">account_circle</span>
        </RouterLink>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <Transition name="nav-overlay">
      <div v-if="menuOpen" class="overlay" @click="closeMenu"></div>
    </Transition>

    <Transition name="nav-drawer">
      <aside
        v-if="menuOpen"
        id="mobile-nav"
        ref="drawerEl"
        class="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabindex="-1"
        @click.stop
      >
        <div class="drawerHead">
          <RouterLink class="drawerBrand" to="/" @click="closeMenu">
            <span class="brand-dot material-symbols-rounded" aria-hidden="true">poker_chip</span>
            <div class="drawerBrandText">
              <div class="drawerTitle">Royal Flush Casino</div>
              <div class="drawerSub muted">Menu</div>
            </div>
          </RouterLink>

          <button class="iconBtn" type="button" aria-label="Zamknij menu" @click="closeMenu">
            <span class="material-symbols-rounded">close</span>
          </button>
        </div>

        <div class="drawerNav">
          <RouterLink class="drawerLink" to="/" @click="closeMenu">
            <span class="material-symbols-rounded">home</span>
            <span>Strona główna</span>
          </RouterLink>
          <RouterLink class="drawerLink" to="/slots" @click="closeMenu">
            <span class="material-symbols-rounded">view_column</span>
            <span>Slots</span>
          </RouterLink>
          <RouterLink class="drawerLink" to="/roulette" @click="closeMenu">
            <span class="material-symbols-rounded">circle_circle</span>
            <span>Ruletka</span>
          </RouterLink>
          <RouterLink class="drawerLink" to="/dice" @click="closeMenu">
            <span class="material-symbols-rounded">casino</span>
            <span>Kości</span>
          </RouterLink>
          <RouterLink class="drawerLink" to="/blackjack" @click="closeMenu">
            <span class="material-symbols-rounded">playing_cards</span>
            <span>Blackjack</span>
          </RouterLink>
          <RouterLink class="drawerLink" to="/daily" @click="closeMenu">
            <span class="material-symbols-rounded">today</span>
            <span>Daily</span>
          </RouterLink>
          <RouterLink class="drawerLink" to="/ranking" @click="closeMenu">
            <span class="material-symbols-rounded">trophy</span>
            <span>Ranking</span>
          </RouterLink>
          <RouterLink class="drawerLink" :to="profileLink" @click="closeMenu">
            <span class="material-symbols-rounded">account_circle</span>
            <span>Profil</span>
          </RouterLink>
        </div>

        <div class="drawerFooter">
          <div class="drawerMeta">
            <div class="drawerPill" title="Tokens">
              <span class="material-symbols-rounded">poker_chip</span>
              <span class="mono">{{ session.balance.toLocaleString('pl-PL') }}</span>
            </div>
            <div class="drawerPill" title="Użytkownik">
              <span class="material-symbols-rounded">account_circle</span>
              <span class="mono">{{ session.handle }}</span>
            </div>
          </div>

          <div class="drawerActions">
            <RouterLink v-if="!session.isLoggedIn" class="btn btn-primary drawerBtn" to="/register" @click="closeMenu">
              <span class="material-symbols-rounded">person_add</span>
              <span>Rejestracja</span>
            </RouterLink>
            <RouterLink v-if="!session.isLoggedIn" class="btn drawerBtn" to="/login" @click="closeMenu">
              <span class="material-symbols-rounded">login</span>
              <span>Logowanie</span>
            </RouterLink>

            <button v-if="session.isLoggedIn" class="btn drawerBtn" type="button" @click="onLogout">
              <span class="material-symbols-rounded">logout</span>
              <span>Wyloguj</span>
            </button>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useSessionStore } from '../stores/session.js'

const session = useSessionStore()
const route = useRoute()

const profileLink = computed(() => {
  if (!session.isLoggedIn) return { name: 'profile' }
  return { name: 'profile', query: { handle: session.handle } }
})

const menuOpen = ref(false)
const drawerEl = ref(null)
let bodyOverflowBefore = ''

function openMenu() {
  menuOpen.value = true
}

function closeMenu() {
  menuOpen.value = false
}

function onLogout() {
  session.logout()
  closeMenu()
}

function onKeydown(e) {
  if (!menuOpen.value) return
  if (e.key === 'Escape') closeMenu()
}

watch(menuOpen, async (open) => {
  if (typeof document === 'undefined') return

  if (open) {
    bodyOverflowBefore = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    drawerEl.value?.focus?.()
  } else {
    document.body.style.overflow = bodyOverflowBefore
  }
})

watch(
  () => route.fullPath,
  () => {
    if (menuOpen.value) closeMenu()
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: linear-gradient(180deg, rgba(10, 4, 12, 0.92), rgba(10, 4, 12, 0.68));
  border-bottom: 1px solid rgba(255,255,255,0.10);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 16px;
  width: min(1120px, 100%);
  margin: 0 auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.brand-dot {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 30%, #352601, #380313);
  box-shadow: 0 0 0 3px rgba(255, 217, 0, 0.12), 0 0 22px rgba(255, 123, 0, 0.55);
  color: #ac4c15;
  font-variation-settings: 'FILL' 0, 'wght' 100, 'GRAD' 0, 'opsz' 24;
}

.links {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  color: rgba(255,255,255,0.78);
  transition: background 180ms var(--easeOut), border-color 180ms var(--easeOut), color 180ms var(--easeOut);
  font-size: 13px;
}

.link:hover {
  color: rgba(255,255,255,0.92);
  background: rgba(255,255,255,0.06);
}

.link.router-link-active {
  color: rgba(255,255,255,0.96);
  border-color: rgba(255, 183, 3, 0.28);
  background: linear-gradient(135deg, rgba(255, 0, 76, 0.25), rgba(255, 183, 3, 0.18));
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 183, 3, 0.25);
  background: rgba(255, 183, 3, 0.10);
  box-shadow: 0 10px 26px rgba(255, 183, 3, 0.08);
}

.pill-val { font-variant-numeric: tabular-nums; }

.saldo {
  position: relative;
  padding-right: 1rem;
}

.saldo .icon {
  position: absolute;
  right: 0.25rem;
  opacity: 0.25;
  font-size: 32px;
}

.saldo .pill-val {
  z-index: 1;
  font-weight: 600;
}

.user {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.06);
}

.user-handle {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255,255,255,0.86);
  font-size: 13px;
}

.iconBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.86);
  cursor: pointer;
  transition: transform 180ms var(--easeOut), background 180ms var(--easeOut), border-color 180ms var(--easeOut);
}

.iconBtn:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,0.08);
  border-color: rgba(255, 0, 76, 0.28);
}

.menuBtn { display: none; }

.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(10px);
}

.drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: min(86vw, 360px);
  z-index: 110;
  padding: 14px;
  border-left: 1px solid rgba(255,255,255,0.12);
  background:
    radial-gradient(520px 380px at 70% 10%, rgba(255, 0, 76, 0.22), transparent 55%),
    radial-gradient(520px 380px at 10% 60%, rgba(255, 183, 3, 0.16), transparent 55%),
    linear-gradient(180deg, rgba(10, 4, 12, 0.96), rgba(10, 4, 12, 0.86));
  box-shadow: 0 40px 90px rgba(0,0,0,0.60), 0 0 70px rgba(255, 0, 76, 0.10);
  outline: none;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 14px;
}

.drawerHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.drawerBrand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.drawerBrandText { display: grid; gap: 1px; }
.drawerTitle { font-weight: 900; letter-spacing: 0.2px; }
.drawerSub { font-size: 12px; }

.drawerNav {
  display: grid;
  gap: 8px;
  align-content: start;
}

.drawerLink {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.86);
  transition: transform 180ms var(--easeOut), border-color 180ms var(--easeOut), background 180ms var(--easeOut);
}

.drawerLink:hover {
  transform: translateY(-1px);
  background: rgba(255,255,255,0.07);
  border-color: rgba(255, 183, 3, 0.20);
}

.drawerLink.router-link-active {
  border-color: rgba(255, 183, 3, 0.28);
  background: linear-gradient(135deg, rgba(255, 0, 76, 0.22), rgba(255, 183, 3, 0.14));
}

.drawerFooter { display: grid; gap: 12px; }

.drawerMeta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.drawerPill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}

.mono { font-variant-numeric: tabular-nums; }

.drawerActions { display: grid; gap: 10px; }
.drawerBtn { width: 100%; justify-content: center; }

.nav-overlay-enter-active,
.nav-overlay-leave-active {
  transition: opacity 200ms var(--easeOut);
}

.nav-overlay-enter-from,
.nav-overlay-leave-to {
  opacity: 0;
}

.nav-drawer-enter-active,
.nav-drawer-leave-active {
  transition: transform 260ms var(--easeOut), opacity 260ms var(--easeOut);
}

.nav-drawer-enter-from,
.nav-drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 980px) {
  .links { display: none; }
  .menuBtn { display: inline-flex; }
  .user-handle { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .nav-drawer-enter-active,
  .nav-drawer-leave-active,
  .nav-overlay-enter-active,
  .nav-overlay-leave-active {
    transition: none;
  }
}
</style>

