import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '../stores/session.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },

    { path: '/slots', name: 'slots', meta: { requiresAuth: true }, component: () => import('../views/SlotsView.vue') },
    {
      path: '/roulette',
      name: 'roulette',
      meta: { requiresAuth: true },
      component: () => import('../views/RouletteView.vue'),
    },
    { path: '/dice', name: 'dice', meta: { requiresAuth: true }, component: () => import('../views/DiceView.vue') },
    {
      path: '/blackjack',
      name: 'blackjack',
      meta: { requiresAuth: true },
      component: () => import('../views/BlackjackView.vue'),
    },
    { path: '/daily', name: 'daily', meta: { requiresAuth: true }, component: () => import('../views/DailyView.vue') },

    { path: '/ranking', name: 'ranking', component: () => import('../views/RankingView.vue') },
    { path: '/profile', name: 'profile', component: () => import('../views/ProfileView.vue') },

    { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('../views/NotFoundView.vue') },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta?.requiresAuth) return true
  const session = useSessionStore()

  if (session.isLoggedIn) return true
  return { name: 'login', query: { redirect: to.fullPath } }
})

export default router
