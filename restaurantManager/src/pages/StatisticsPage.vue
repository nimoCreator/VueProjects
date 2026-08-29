<template>
  <section class="panel">
    <div class="header">
      <div>
        <h2>Statystyki</h2>
        <p class="muted">Podsumowanie zamówień dla każdej pozycji z menu.</p>
      </div>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Pozycja</th>
            <th>Ilość zamówień</th>
            <th>Łączny przychód</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td class="name">{{ row.name }}</td>
            <td>{{ row.count }}</td>
            <td>{{ row.total }} zł</td>
            <td>
              <span class="chip" :class="row.active ? 'active' : 'inactive'">
                {{ row.active ? 'Aktywne' : 'Wycofane' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { useMenuStore } from '../stores/menu'
import { useOrdersStore } from '../stores/orders'

export default {
  name: 'StatisticsPage',
  data() {
    return {
      menu: useMenuStore(),
      orders: useOrdersStore(),
    }
  },
  computed: {
    rows() {
      const summary = new Map()
      this.menu.items.forEach((item) => {
        summary.set(item.id, { count: 0, total: 0 })
      })

      this.orders.orders.forEach((order) => {
        order.items.forEach((item) => {
          if (!summary.has(item.menuId)) {
            summary.set(item.menuId, { count: 0, total: 0 })
          }
          const entry = summary.get(item.menuId)
          entry.count += item.quantity
          entry.total += item.quantity * item.price
        })
      })

      return this.menu.items.map((item) => {
        const entry = summary.get(item.id) || { count: 0, total: 0 }
        return {
          id: item.id,
          name: item.name,
          count: entry.count,
          total: entry.total,
          active: !item.deleted,
        }
      })
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

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.muted {
  color: var(--muted);
  font-size: 14px;
  margin: 6px 0 0 0;
}

.table-wrap {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table th,
.table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

.table th {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.name {
  font-weight: 600;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.chip.active {
  background: #eef6ed;
  color: #2f5f2f;
}

.chip.inactive {
  background: #f7efe7;
  color: #815339;
}
</style>
