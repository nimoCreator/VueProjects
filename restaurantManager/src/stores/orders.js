import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { readStorage, writeStorage } from './storage'

const ORDERS_KEY = 'rm.orders.items'
const LAST_ID_KEY = 'rm.orders.lastId'

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref(readStorage(ORDERS_KEY, []))
  const lastId = ref(readStorage(LAST_ID_KEY, 0))

  watch(
    orders,
    (value) => {
      writeStorage(ORDERS_KEY, value)
    },
    { deep: true }
  )

  watch(lastId, (value) => {
    writeStorage(LAST_ID_KEY, value)
  })

  function nextId() {
    lastId.value += 1
    return lastId.value
  }

  function addOrder({ tableNumber, items }) {
    orders.value.unshift({
      id: nextId(),
      tableNumber,
      items,
      status: 'ordered',
      createdAt: new Date().toISOString(),
    })
  }

  function setStatus(id, status) {
    const found = orders.value.find((order) => order.id === id)
    if (found) found.status = status
  }

  const ordered = computed(() => orders.value.filter((o) => o.status === 'ordered'))
  const inProgress = computed(() =>
    orders.value.filter((o) => o.status === 'in_progress' || o.status === 'ready')
  )
  const ready = computed(() => orders.value.filter((o) => o.status === 'ready'))
  const activeForDelivery = computed(() =>
    orders.value.filter((o) => o.status === 'ready' || o.status === 'served')
  )

  function getOrderTotal(order) {
    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  return {
    orders,
    ordered,
    inProgress,
    ready,
    activeForDelivery,
    addOrder,
    setStatus,
    getOrderTotal,
  }
})
