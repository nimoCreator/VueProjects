<template>
  <section class="grid two">
    <div class="panel">
      <h2>Menu</h2>
      <div class="list">
        <div v-for="item in menu.items" :key="item.id" class="menuItemRow">
            <strong>{{ item.name }}</strong>
            <input
              type="number"
              min="0"
              step="1"
              v-model.number="item.price"
              @change="menu.updatePrice(item.id, item.price)"
            />
            <button class="secondary" @click="menu.deletedItem(item.id)">
              <span class="material-symbols-rounded">delete</span>
            </button>
        </div>
      </div>
    </div>

    <div class="panel">
      <h2>Dodaj pozycję</h2>
      <div class="grid">
        <label>
          <div class="muted">Nazwa</div>
          <input v-model="newName" placeholder="np. Burger" />
        </label>
        <label>
          <div class="muted">Cena</div>
          <input v-model="newPrice" type="number" min="0" step="1" placeholder="np. 25" />
        </label>
        <button @click="addItem">Dodaj do menu</button>
      </div>
      <div class="divider"></div>
      <p class="muted">
        Pozycje oznaczone jako usunięte pozostają w pamięci, ale nie pojawią się w formularzu
        zamówienia.
      </p>
    </div>
  </section>
</template>

<script>
import { useMenuStore } from '../stores/menu'

export default {
  name: 'MenuPage',
  data() {
    return {
      menu: useMenuStore(),
      newName: '',
      newPrice: '',
    }
  },
  methods: {
    addItem() {
      const name = this.newName.trim()
      const price = Number(this.newPrice)
      if (!name || Number.isNaN(price)) return
      this.menu.addItem(name, price)
      this.newName = ''
      this.newPrice = ''
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



.menuItemRow {
  display: flex;
  align-items: center;
  justify-content: stretch;


  border-bottom: 2px dashed var(--muted);
}
.menuItemRow strong {
  flex: 1;

  color: var(--muted);
}
.menuItemRow input {
  all: unset;
  width: 4rem;
  min-width: none;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  font-weight: 500;

  text-align: right;

  position: relative;
}
.menuItemRow input:after {
  content: 'PLN';
  margin-left: 4px;
  font-size: 12px;
  color: var(--muted);
}
.menuItemRow button {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px;
  border-radius: 8px;

  transform: scale(1);

  color: var(--muted);

  transition: 0.4s;
}
.menuItemRow button:hover {
  color: #463b2f;

  transform: scale(1.1);

  transition: 0.1s;
}
.menuItemRow button:active {
  color: #463b2f;

  transform: scale(0.9);

  transition: 0.01s;
}


</style>
