<template>
    <div>
        <RestaurantNavbar />

        <h1>Sala</h1>
        <div class="main">
            <form @submit.prevent="addOrder">
                <h2>Złóż zamówienie</h2>
                <select v-model="menuItemId" required>
                    <option disabled value="">Wybierz danie</option>
                    <option v-for="item in store.menu" :key="item.id" :value="item.id">
                        {{ item.name }}
                    </option>
                </select>
                <input v-model.number="quantity" placeholder="Ilość" required />
                <input v-model="table" placeholder="Stolik" required />
                <button type="submit">Dodaj zamówienie</button>
            </form>

            <div class="orders">
                <h2>Zamówienia gotowe do podania</h2>
                <ul>
                    <li v-for="order in readyOrders" :key="order.id">
                        {{ order.quantity }} x {{ order.dishName }}<br>
                        Stolik: {{ order.table }}<br>
                        <button @click="markServed(order.id)">Oznacz jako podane</button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <RestauracjaFooter />
</template>

<script>
import { ref, computed } from 'vue';
import { store } from '@/assets/js/restauracja';
import RestaurantNavbar from '@/views/Egzaminy/Restauracja/RestauracjaNavbar.vue';
import '@/assets/css/restauracja.css';
import RestauracjaFooter from './RestauracjaFooter.vue';        

export default {
    components: { RestaurantNavbar, RestauracjaFooter },
    setup() {
        const menuItemId = ref('');
        const quantity = ref(1);
        const table = ref('');

        function addOrder() {
            store.addOrder(menuItemId.value, quantity.value, table.value, new Date().toISOString().split('T')[0]);
            menuItemId.value = '';
            quantity.value = 1;
            table.value = '';
        }

        const readyOrders = computed(() =>
            store.orders.filter(o => o.status === 'ready')
        );

        function markServed(orderId) {
            store.updateOrderStatus(orderId, 'served');
        }

        function orderInfo(order) {
            const item = store.menu.find(i => i.id === order.menuItemId);
            return `${item?.name || 'Nieznane danie'} x${order.quantity} - Stolik: ${order.table}`;
        }

        return { store, menuItemId, quantity, table, addOrder, readyOrders, markServed, orderInfo };
    }
};
</script>

<style>
@import url('@/assets/css/restuaruacjaOutOfScope.css');
</style>
<style lang="css" scoped>
@import url('@/assets/css/restauracja.css');

form {
    display: flex;
    flex-direction: column;
}

.main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
}
.orders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>