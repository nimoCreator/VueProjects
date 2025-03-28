

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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #101214;
  margin: 0;

  padding: 1rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

* {
  box-sizing: border-box;
}

</style>
