<template>
  <input type="number" v-model="counter">
  <button @click="mojaf">Increment</button>
  <span v-for="i in counter" :key="i">
    😃
  </span>
  <div v-if="counter > 5">
    <h1>To widzi tylko studnet</h1>
  </div>
  <div v-else>
    <h1>To widzi tylko nauczyciel</h1>
  </div>
</template>

<script >
export default {
  name: 'App',
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    mojaf() {
      this.counter++
    }
  }
}
</script>

<style scoped>

</style>
