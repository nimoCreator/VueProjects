import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    slogan: {
      welcome: 'Welcome',
      to: 'to',
      scroll: 'Scroll down',
    },
    settings: {
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    navigation: {
        home: "Home pade",
        blog: "Blog",
        projects: "Projects",
        links: "Links",
        notifications: "Notifications",
        settings: "Settings",
        support: "Support",
        userPanel: "User",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        animationsOn: "Turn Off Animations",
        animationsOff: "Turn On Animations",
    },
    construction: {
      title: 'Sorry! This page is still under construction.',
      description: 'Come back later, follow the blog for updates, and check the contact page if you have any questions!',
      bread: 'While you wait, enjoy this bread:',
    }

  },
  pl: {
    slogan: {
      welcome: 'Witaj',
      to: 'na',
      scroll: 'Zjedź w dół',
    },
    settings: {
      lightMode: 'Tryb Jasny',
      darkMode: 'Tryb Ciemny',
    },
    navigation: {
        home: "Strona Główna",
        blog: "Blog",
        projects: "Projekty",
        links: "Linki",
        notifications: "Powiadomienia",
        settings: "Ustawienia",
        support: "Wsparcie",
        userPanel: "Panel Użytkownika",
        lightMode: "Zmień na Tryb Jasny",
        darkMode: "Zmień na Tryb Ciemny",
        animationsOn: "Wyłącz Animacje",
        animationsOff: "Włącz Animacje",
    },
    construction: {
      title: 'Przepraszamy! Ta strona jest wciąż w budowie.',
      description: 'Zapraszam później. Śledź bloga, aby być na bieżąco. Sprawdź stronę kontaktową, jeśli masz jakieś pytania!',
      bread: 'A póki co, ciesz się tym chlebkiem:',
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // domyślny język
  fallbackLocale: 'en',
  messages,
})

export default i18n
