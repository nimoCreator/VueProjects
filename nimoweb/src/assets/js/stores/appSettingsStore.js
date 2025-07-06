import { defineStore } from 'pinia'

const STORAGE_KEY = 'nimowebAppSettings'

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export const useAppSettingsStore = defineStore('appSettings', {
  state: () => ({
    language: 'en',
    colorScheme: 'light',
  }),

  actions: {
    initialize() {
      const saved = loadSettings()
      this.$patch({ ...saved })
      this.applyColorSchemeClass()

      // 🧠 subscribe to changes
      this.$subscribe((mutation, state) => {
        saveSettings(state)
        this.applyColorSchemeClass()
      })
    },

    applyColorSchemeClass() {
      const schemeClass = this.colorScheme === 'dark' ? 'darkMode' : 'lightMode'
      document.body.classList.remove('lightMode', 'darkMode')
      document.getElementById('app')?.classList.remove('lightMode', 'darkMode')
      document.body.classList.add(schemeClass)
      document.getElementById('app')?.classList.add(schemeClass)
    }
  }
})
