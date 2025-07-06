<template>
    <div>
        <RestaurantNavbar />

        <h1>Menu</h1>
        <div class="main">
            <form @submit.prevent="addItem">
                <h2>Dodaj pozycje do menu</h2>
                <input v-model="name" placeholder="Nazwa dania" required />
                <input v-model.number="price" placeholder="Cena" required />
                <button type="submit">Dodaj danie</button>
            </form>
            <div class="orders">
                <h2>Menu</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Cena</th>
                            <th>Sprzedano</th>
                            <th>Zarobiono</th>
                        </tr>
                    </thead>
                    <tr v-for="item in store.menu" :key="item.id">
                        <!-- {{ item.name }} - {{ item.price }} zł | Sprzedano {{ item.totalSold }} | Zarobiono {{ item.totalSold *
                item.price }} zł -->
                        <td>
                            {{ item.name }}
                        </td>
                        <td>
                            {{ item.price }} zł
                        </td>
                        <td>
                            {{ item.totalSold }}
                        </td>
                        <td>
                            {{ item.totalSold * item.price }} zł
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <RestauracjaFooter />
</template>

<script>
import { ref } from 'vue';
import { store } from '@/assets/js/restauracja';
import RestaurantNavbar from '@/views/Egzaminy/Restauracja/RestauracjaNavbar.vue';
import RestauracjaFooter from './RestauracjaFooter.vue';

export default {
    components: { RestaurantNavbar, RestauracjaFooter },
    setup() {
        const name = ref('');
        const price = ref(0);

        function addItem() {
            store.addMenuItem(name.value, price.value);
            name.value = '';
            price.value = 0;
        }

        return { store, name, price, addItem };
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
    flex-direction: row;
    align-items: start;
    justify-content: center;
    margin-top: 20px;
    gap: 2rem;
}

form {
    display: flex;
    flex-direction: column;
}

table {
    margin-top: 20px;
    border-collapse: collapse;
}
</style>