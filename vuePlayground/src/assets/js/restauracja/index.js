// src/stores/orderStore.js
import { reactive, watch } from 'vue';

// Spróbuj załadować dane z localStorage
const savedData = JSON.parse(localStorage.getItem('restaurant-data')) || {
  menu: [],
  orders: []
};

export const store = reactive({
  menu: savedData.menu,
  orders: savedData.orders,

  addMenuItem(name, price) {
    this.menu.push({ id: Date.now(), name, price, totalSold: 0, totalRevenue: 0 });
  },

  addOrder(dishId, quantity, table) {
    const dish = this.menu.find(item => item.id === dishId);
    if (dish) {
      this.orders.push({
        id: Date.now(),
        dishId: dish.id,
        dishName: dish.name,
        price: dish.price,
        quantity,
        table,
        date: new Date().toISOString(),
        status: 'preparing'
      });
      // Aktualizuj sumy
      dish.totalSold += quantity;
      dish.totalRevenue += quantity * dish.price;
    }
  },

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
    }
  }
});

// Zapisuj automatycznie każdą zmianę w store
watch(
  store,
  (newValue) => {
    localStorage.setItem('restaurant-data', JSON.stringify(newValue));
  },
  { deep: true }
);
