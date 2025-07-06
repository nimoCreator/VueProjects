import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GameSetupView from '@/views/GameSetupView.vue'
import GameView from '@/views/GameView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/setup',
    name: 'setup',
    component: GameSetupView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router