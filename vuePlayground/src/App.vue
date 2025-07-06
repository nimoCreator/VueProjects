

<template>
  <router-view/>
</template>

<script>
import BiletyPociagowe from './views/Egzaminy/BiletyPociagowe.vue';

export default {
  components: {
    BiletyPociagowe,
  },
};

</script>

<style>

body {
  font-family: 'Lato','Avenir', Helvetica, Arial, sans-serif;
  background-color: #101214;

  color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  margin: 0;
  padding: 0;

  color-scheme: dark;

  height: 100vh;
  min-height: 100vh;
  min-height: 100svh;
}

#app {
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}

</style>
