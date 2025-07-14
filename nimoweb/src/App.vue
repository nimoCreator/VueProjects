<template>
  <Navbar/>
  <main>
    <router-view/>
  </main>

  <!-- <nimoFooter/> -->
</template>


<script>

import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useAppSettingsStore } from '@/assets/js/stores/appSettingsStore'
import nimoFooter from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'App',
  components: {
    nimoFooter,
    Navbar
  },
  setup() {
    const settings = useAppSettingsStore()
    settings.initialize()

    const { language, colorScheme, animations } = storeToRefs(settings)

    const { locale } = useI18n()

    watch(language, (newLang) => {
      locale.value = newLang
    }, { immediate: true })

return { language, colorScheme, animations }
  }
};

</script>

<style>

@import url('@/assets/css/base.css');
/* @import url('@/assets/css/main.css'); */
@import url('@/assets/css/vars.css');

</style>