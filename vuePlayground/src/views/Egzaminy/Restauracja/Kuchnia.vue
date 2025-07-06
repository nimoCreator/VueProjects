<template>
    <div>
        <RestaurantNavbar />

        <h1>Kuchnia</h1>
        <div class="main">
            <h2>Zamówienia do przygotowania</h2>
            <ul>
                <li v-for="order in preparingOrders" :key="order.id">
                     {{ order.quantity }} x {{ order.dishName }}<br>
                    <button @click="markReady(order.id)">Oznacz jako gotowe</button>
                </li>
            </ul>
        </div>
    </div>
    <RestauracjaFooter />
</template>

<script>
import { computed } from 'vue';
import { store } from '@/assets/js/restauracja';
import RestaurantNavbar from '@/views/Egzaminy/Restauracja/RestauracjaNavbar.vue';
import '@/assets/css/restauracja.css';
import RestauracjaFooter from './RestauracjaFooter.vue';

export default {
    components: { RestaurantNavbar, RestauracjaFooter },
    setup() {
        const preparingOrders = computed(() =>
            store.orders.filter(o => o.status === 'preparing')
        );

        function markReady(orderId) {
            store.updateOrderStatus(orderId, 'ready');
        }

        function orderInfo(order) {
            const item = store.menu.find(i => i.id === order.menuItemId);
            return `${item?.name || 'Nieznane danie'} x${order.quantity} - Stolik: ${order.table}`;
        }

        return { store, preparingOrders, markReady, orderInfo };
    }
};
</script>

<style>
@import url('@/assets/css/restuaruacjaOutOfScope.css');
</style>
<style lang="css" scoped>
@import url('@/assets/css/restauracja.css');

.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 70vw;
}

</style>