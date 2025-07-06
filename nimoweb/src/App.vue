<template :class="{lightMode: colorScheme === 'light', darkMode: colorScheme === 'dark'}">
  <Navigation
    v-model:language="language" 
    v-model:colorScheme="colorScheme" 
  />
  <main>
    <router-view />
  </main>

  <nimoFooter/>
</template>


<script>

import { storeToRefs } from 'pinia'
import { useAppSettingsStore } from '@/assets/js/stores/appSettingsStore'
import nimoFooter from './components/Footer.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: {
    nimoFooter,
    Navigation
  },
  setup() {
    const settings = useAppSettingsStore()
    settings.initialize()
    
    const { language, colorScheme } = storeToRefs(settings)

    return { language, colorScheme }
  }
};

</script>

<style>

@import url('@/assets/css/base.css');
/* @import url('@/assets/css/main.css'); */
@import url('@/assets/css/vars.css');

</style>