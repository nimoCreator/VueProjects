import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import MenuPage from '../pages/MenuPage.vue'
import OrderPage from '../pages/OrderPage.vue'
import KitchenPage from '../pages/KitchenPage.vue'
import DeliveryPage from '../pages/DeliveryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/menu', name: 'menu', component: MenuPage },
    { path: '/order', name: 'order', component: OrderPage },
    { path: '/kitchen', name: 'kitchen', component: KitchenPage },
    { path: '/delivery', name: 'delivery', component: DeliveryPage },
  ],
})

export default router
