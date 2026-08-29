import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { readStorage, writeStorage } from './storage'

const STORAGE_KEY = 'rm.menu.items'

const starterMenu = [
  { id: 1, name: 'Schabowy', price: 32, deleted: false },
  { id: 2, name: 'Frytki', price: 14, deleted: false },
  { id: 3, name: 'Zupa dnia', price: 18, deleted: false },
]

export const useMenuStore = defineStore('menu', () => {
  const items = ref(readStorage(STORAGE_KEY, starterMenu))
  const lastId = ref(readStorage('rm.menu.lastId', items.value.length))

  watch(
    items,
    (value) => {
      writeStorage(STORAGE_KEY, value)
    },
    { deep: true }
  )

  watch(lastId, (value) => {
    writeStorage('rm.menu.lastId', value)
  })

  const activeItems = computed(() => items.value.filter((item) => !item.deleted))

  function addItem(name, price) {
    lastId.value += 1
    items.value.push({
      id: lastId.value,
      name,
      price,
      deleted: false,
    })
  }

  function updatePrice(id, price) {
    const found = items.value.find((item) => item.id === id)
    if (found) found.price = price
  }

  function toggleDeleted(id) {
    const found = items.value.find((item) => item.id === id)
    if (found) found.deleted = !found.deleted
  }

  function deletedItem(id) {
    const index = items.value.findIndex((item) => item.id === id)
    if (index !== -1) items.value.splice(index, 1)
  }

  return {
    items,
    activeItems,
    addItem,
    updatePrice,
    toggleDeleted,
    deletedItem,
  }
})
