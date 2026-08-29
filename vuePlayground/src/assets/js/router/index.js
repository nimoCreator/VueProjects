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
    },
    {
      path: '/BinaryGame',
      name: 'BinaryGame',
      component: () => import('@/views/BinaryGame.vue'),
    },
    {
      path: '/ThanksBlender.vue',
      name: 'ThanksBlender',
      component: () => import('@/views/ThanksBlender.vue'),

    },
    {
      path: '/Chat',
      name: 'Chat',
      component: () => import('@/views/Chat.vue'),
    },
    {
      path: '/LagoonaRPG',
      name: 'LagoonaRPG',
      component: () => import('@/views/LagoonaRPG.vue'),
    },
    {
      path: '/CssFuns',
      name: 'CssFuns',
      component: () => import('@/views/CssFuns.vue'),
    },
    {
      path: '/playground',
      name: 'playground',
      component: () => import('@/views/Playground.vue'),
    },
    {
      path: `/clock`,
      name: 'clock',
      component: () => import('@/views/Clock.vue'),
    },
    {
      path: '/funnyMathQuestion',
      name: 'funnyMathQuestion',
      component: () => import('@/views/FunnyMathQuestion.vue'),
    },
    {
      path: '/lagoona-stats-posts/daily-channels',
      name: 'DailyChannels',
      component: () => import('@/views/LagoonaStatsPosts/DailyChannels.vue'),
    },
    {
      path: '/lagoona-stats-posts/daily-messages-sent',
      name: 'DailyMessagesSent',
      component: () => import('@/views/LagoonaStatsPosts/DailyMessagesSent.vue'),
    },
    {
      path: '/lagoona-stats-posts/daily-reactions',
      name: 'DailyReactions',
      component: () => import('@/views/LagoonaStatsPosts/DailyReactions.vue'),
    },
    {
      path: '/lagoona-stats-posts/daily-vc',
      name: 'DailyVC',
      component: () => import('@/views/LagoonaStatsPosts/DailyVC.vue'),
    },
    {
      path: '/lagoona-stats-posts/weekly-channels',
      name: 'WeeklyChannels',
      component: () => import('@/views/LagoonaStatsPosts/WeeklyChannels.vue'),
    },
    {
      path: '/lagoona-stats-posts/weekly-messages-sent',
      name: 'WeeklyMessagesSent',
      component: () => import('@/views/LagoonaStatsPosts/WeeklyMessagesSent.vue'),
    },
    {
      path: '/lagoona-stats-posts/weekly-reactions',
      name: 'WeeklyReactions',
      component: () => import('@/views/LagoonaStatsPosts/WeeklyReactions.vue'),
    },
    {
      path: '/lagoona-stats-posts/weekly-vc',
      name: 'WeeklyVC',
      component: () => import('@/views/LagoonaStatsPosts/WeeklyVC.vue'),
    },
  ],
})

export default router
