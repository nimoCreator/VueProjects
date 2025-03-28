import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('@/views/Inventory.vue'),
    },
    {
      path: '/biletyPociagowe',
      name: 'biletyPociagowe',
      component: () => import('@/views/Egzaminy/BiletyPociagowe.vue'),
    },
    { 
      path: '/Tetris',
      name: 'Tetris',
      component: () => import('@/views/Tetris.vue'),
    },
    {
      path: '/CssDemo',
      name: 'CssDemo',
      component: () => import('@/views/CssDemo.vue'),
    },
    {
      path: '/QuickDemo',
      name: 'QuickDemo',
      component: () => import('@/views/QuickDemo.vue'),
    },
    {
      path: '/Restauracja',
      name: 'Restauracja',
      component: () => import('@/views/Egzaminy/Restauracja/Restauracja.vue'),
    },
    {
      path: '/Restauracja/Menu',
      name: 'Menu',
      component: () => import('@/views/Egzaminy/Restauracja/Menu.vue'),
    },
    {
      path: '/Restauracja/Sala',
      name: 'Sala',
      component: () => import('@/views/Egzaminy/Restauracja/Sala.vue'),
    },
    {
      path: '/Restauracja/Kuchnia',
      name: 'Kuchnia',
      component: () => import('@/views/Egzaminy/Restauracja/Kuchnia.vue'),
    },
    {
      path: '/Snake',
      name: 'Snake',
      component: () => import('@/views/Snake.vue'),
    }

  ],
})

export default router
