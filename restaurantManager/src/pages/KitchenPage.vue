<template>
  <section class="grid two">
    <div class="panel">
      <h2>Zamówione</h2>
      <div v-if="orders.ordered.length === 0" class="muted">Brak nowych zamówień.</div>
      <div v-else class="list">
        <div v-for="order in orders.ordered" :key="order.id" class="panel">
          <div class="row">
            <strong>Stolik {{ order.tableNumber }}</strong>
            <span class="chip">Nowe</span>
          </div>
          <div class="list">
            <div v-for="item in order.items" :key="item.menuId" class="row">
              <span>{{ item.name }}</span>
              <span class="chip">{{ item.quantity }} szt.</span>
            </div>
          </div>
          <button @click="acceptOrder(order.id)">Przyjmij zamówienie</button>
        </div>
      </div>
    </div>

    <div class="panel">
      <h2>W przygotowaniu</h2>
      <div v-if="orders.inProgress.length === 0" class="muted">Brak zamówień w realizacji.</div>
      <div v-else class="list">
        <div v-for="order in orders.inProgress" :key="order.id" class="panel">
          <div class="row">
            <strong>Stolik {{ order.tableNumber }}</strong>
            <span class="chip">{{ order.status === 'ready' ? 'Gotowe' : 'W realizacji' }}</span>
          </div>
          <div class="list">
            <div v-for="item in order.items" :key="item.menuId" class="row">
              <span>{{ item.name }}</span>
              <span class="chip">{{ item.quantity }} szt.</span>
            </div>
          </div>
          <button class="secondary" @click="markReady(order.id)">Gotowe</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useOrdersStore } from '../stores/orders'

export default {
  name: 'KitchenPage',
  data() {
    return {
      orders: useOrdersStore(),
    }
  },
  methods: {
    acceptOrder(id) {
      this.orders.setStatus(id, 'in_progress')
    },
    markReady(id) {
      this.orders.setStatus(id, 'ready')
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

.grid {
  display: grid;
  gap: 16px;
}

.grid.two {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
