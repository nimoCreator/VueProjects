<template>
  <section class="grid two">
    <div class="panel">
      <h2>Nowe zamówienie</h2>
      <div class="grid">
        <label>
          <div class="muted">Numer stolika</div>
          <input v-model="tableNumber" placeholder="np. 12" />
        </label>

        <label>
          <div class="muted">Pozycja z menu</div>
          <select v-model="selectedId">
            <option value="">Wybierz pozycję</option>
            <option v-for="item in menu.activeItems" :key="item.id" :value="item.id">
              {{ item.name }} • {{ item.price }} zł
            </option>
          </select>
        </label>

        <label>
          <div class="muted">Ilość porcji</div>
          <input v-model.number="quantity" type="number" min="1" step="1" />
        </label>

        <button class="secondary" @click="addToOrder">Dodaj do zamówienia</button>
      </div>
    </div>

    <div class="panel">
      <h2>Podsumowanie</h2>
      <div v-if="orderItems.length === 0" class="muted">
        Brak pozycji. Dodaj coś z menu.
      </div>
      <div v-else class="list">
        <div v-for="item in orderItems" :key="item.menuId" class="panel">
          <div class="row">
            <strong>{{ item.name }}</strong>
            <span class="chip">{{ item.quantity }} x {{ item.price }} zł</span>
            <span class="chip">Razem: {{ item.quantity * item.price }} zł</span>
          </div>
          <button class="ghost" @click="removeItem(item.menuId)">
            <span class="material-symbols-rounded">cancel</span>
          </button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <strong>Łącznie: {{ orderTotal }} zł</strong>
        <button @click="submitOrder">Zapisz zamówienie</button>
      </div>
    </div>
  </section>
</template>

<script>
import { useMenuStore } from '../stores/menu'
import { useOrdersStore } from '../stores/orders'

export default {
  name: 'OrderPage',
  data() {
    return {
      menu: useMenuStore(),
      orders: useOrdersStore(),
      tableNumber: '',
      selectedId: '',
      quantity: 1,
      orderItems: [],
    }
  },
  computed: {
    selectedItem() {
      return this.menu.activeItems.find((item) => item.id === Number(this.selectedId))
    },
    orderTotal() {
      return this.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },
  methods: {
    addToOrder() {
      const item = this.selectedItem
      const qty = Number(this.quantity)
      if (!item || qty <= 0) return

      const existing = this.orderItems.find((entry) => entry.menuId === item.id)
      if (existing) {
        existing.quantity += qty
      } else {
        this.orderItems.push({
          menuId: item.id,
          name: item.name,
          price: item.price,
          quantity: qty,
        })
      }

      this.quantity = 1
    },
    removeItem(menuId) {
      this.orderItems = this.orderItems.filter((entry) => entry.menuId !== menuId)
    },
    submitOrder() {
      if (!this.tableNumber || this.orderItems.length === 0) return
      this.orders.addOrder({
        tableNumber: this.tableNumber,
        items: this.orderItems,
      })
      this.tableNumber = ''
      this.selectedId = ''
      this.orderItems = []
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

.divider {
  height: 1px;
  background: var(--border);
  margin: 12px 0;
}

button.secondary {
  background: #e8e1d9;
  color: #463b2f;
}

button.ghost {
  background: transparent;
  border: 1px dashed var(--border);
  color: var(--muted);
}

.material-symbols-rounded {
  font-size: 20px;
  line-height: 1;
}
</style>
