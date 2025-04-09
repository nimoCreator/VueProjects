<template>
  <div>
    test
  </div>
  <div class="tutorino-app">
    <header class="topbar">
      <img src="@/assets/img/tutorino icon.png" alt="Tutorino logo" class="logo" />
      <nav class="menu">
        <a href="#oferta">Oferta</a>
        <a href="#o-mnie">O mnie</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </header>

    <HeroSection />
    <OfferSection />
    <AboutSection />
    <ContactSection />
    <FooterBar />
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue';
import OfferSection from '@/components/OfferSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  name: 'App',
  components: {
    HeroSection,
    OfferSection,
    AboutSection,
    ContactSection,
    FooterBar
  }
};
</script>
