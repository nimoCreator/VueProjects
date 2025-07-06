<template>
  <nav>
    <router-link to="/restauracja">Home</router-link> |
    <router-link to="/restauracja/menu">Menu</router-link> |
    <router-link to="/restauracja/sala">Sala</router-link> |
    <router-link to="/restauracja/kuchnia">Kuchnia</router-link>
  </nav>
</template>

<script>
export default {
  name: 'RestaurantNav'
}
</script>

<style scoped>
nav {
  background: #f0f0f0;
  padding: 10px;
  margin-bottom: 20px;
  width: 80vw;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
