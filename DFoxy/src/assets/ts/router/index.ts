import { createRouter, createWebHistory } from 'vue-router'

// lazy routes / albo zwykłe importy – jak wolisz
const NoneView = () => import('@/views/NoneView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const ShopView  = () => import('@/views/ShopView.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: NoneView },
    { path: '/about', component: AboutView },
    { path: '/shop', component: ShopView },
    { path: '/:pathMatch(.*)*', component: NoneView }, 
  ],
  scrollBehavior() { return { top: 0 } }
})
