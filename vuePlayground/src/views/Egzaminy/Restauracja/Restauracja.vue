<template>
    
    <RestaurantNavbar />
    
    <h1>Strona Główna</h1>
    <h2>Statystyka:</h2>
    
    <div class="main">
        <div class="mainColumn">
            <p>Ilość dań w menu: {{ store.menu.length }}</p>
            <p>Łączna liczba zamówień: {{ store.orders.length }}</p>
            <p>W przygotowaniu: {{ preparingCount }}</p>
            <p>Gotowe do podania: {{ readyCount }}</p>
            <p>Zarchiwizowane/podane: {{ doneCount }}</p>
            <p>Całkowite zarobki: {{ totalRevenue }} zł</p>
        </div>
    </div>
    <RestauracjaFooter />
</template>

<script>
import { computed } from 'vue';
import { store } from '@/assets/js/restauracja';
import RestaurantNavbar from '@/views/Egzaminy/Restauracja/RestauracjaNavbar.vue';
import RestauracjaFooter from './RestauracjaFooter.vue';

export default {
    components: { RestaurantNavbar, RestauracjaFooter },
    setup() {
        const preparingCount = computed(() => store.orders.filter(o => o.status === 'preparing').length);
        const readyCount = computed(() => store.orders.filter(o => o.status === 'ready').length);
        const doneCount = computed(() => store.orders.filter(o => o.status === 'served').length);
        const totalRevenue = computed(() =>
            store.orders.reduce((sum, order) => sum + (order.price * order.quantity), 0)
        );

        return { store, preparingCount, readyCount, doneCount, totalRevenue };
    }
};
</script>

<style>
@import url('@/assets/css/restuaruacjaOutOfScope.css');
</style>
<style lang="css" scoped>
@import url('@/assets/css/restauracja.css');

.mainColumn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
</style>