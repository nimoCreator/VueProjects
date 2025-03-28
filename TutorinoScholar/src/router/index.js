import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/generator-ukladu-rownan-liniowych',
      name: 'Generator układu równań liniowych',
      component: () => import('../views/SystemOfLinearEquationsGenerator.vue'),
    },
    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    }
  ],
})

export default router
