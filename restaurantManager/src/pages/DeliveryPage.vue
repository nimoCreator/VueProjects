<template>
  <section class="panel">
    <h2>Wydawanie</h2>
    <p class="muted">Lista zamówień gotowych do wydania lub już wydanych.</p>

    <div v-if="orders.activeForDelivery.length === 0" class="muted">
      Brak zamówień do wydania.
    </div>

    <div v-else class="list">
      <div v-for="order in orders.activeForDelivery" :key="order.id" class="panel">
        <div class="row">
          <strong>Stolik {{ order.tableNumber }}</strong>
          <span class="chip">
            {{ order.status === 'served' ? 'Wydane' : 'Gotowe' }}
          </span>
          <span class="chip">Koszt: {{ orders.getOrderTotal(order) }} zł</span>
        </div>
        <div class="list">
          <div v-for="item in order.items" :key="item.menuId" class="row">
            <span>{{ item.name }}</span>
            <span class="chip">{{ item.quantity }} szt.</span>
          </div>
        </div>
        <div class="row">
          <button class="secondary" @click="markServed(order.id)">Wydane</button>
          <button @click="markPaid(order.id)">Opłacone</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useOrdersStore } from '../stores/orders'

export default {
  name: 'DeliveryPage',
  data() {
    return {
      orders: useOrdersStore(),
    }
  },
  methods: {
    markServed(id) {
      this.orders.setStatus(id, 'served')
    },
    markPaid(id) {
      this.orders.setStatus(id, 'paid')
    },
  },
}
</script>

<style scoped>
.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 6px 18px rgba(25, 16, 4, 0.06);
}

.panel h2 {
  margin: 0 0 12px 0;
  font-size: 18px;
}

.muted {
  color: var(--muted);
  font-size: 14px;
}

.list {
  display: grid;
  gap: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.chip {
  padding: 4px 10px;
  border-radius: 999px;
  background: #f7efe7;
  color: #815339;
  font-size: 12px;
}

button.secondary {
  background: #e8e1d9;
  color: #463b2f;
}
</style>
