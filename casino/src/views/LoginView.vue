<template>
  <section class="card">
    <div class="card-inner">
      <h1 class="title">Logowanie</h1>
      <p class="muted">Zaloguj się, żeby grać i zbierać transakcje w historii.</p>

      <form class="form" @submit.prevent="onSubmit">
        <div class="field">
          <label>Handle</label>
          <input v-model.trim="handle" class="input" autocomplete="username" placeholder="np. nimo" />
        </div>
        <div class="field">
          <label>Hasło</label>
          <input v-model="password" class="input" type="password" autocomplete="current-password" />
        </div>

        <div class="row">
          <button class="btn btn-primary" type="submit">
            <span class="material-symbols-rounded">login</span>
            <span>Zaloguj</span>
          </button>
          <RouterLink class="btn btn-ghost" to="/register">
            <span class="material-symbols-rounded">person_add</span>
            <span>Rejestracja</span>
          </RouterLink>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useSessionStore } from '../stores/session.js'

const session = useSessionStore()
const route = useRoute()
const router = useRouter()

const handle = ref('')
const password = ref('')
const error = ref('')

async function onSubmit() {
  error.value = ''
  try {
    await session.login(handle.value, password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.replace(redirect)
  } catch (e) {
    error.value = e?.message ?? 'Nie udało się zalogować.'
  }
}
</script>

<style scoped>
.title { margin: 0 0 6px; font-size: 26px; }
.form { margin-top: 14px; display: grid; gap: 12px; max-width: 520px; }
.row { display: flex; gap: 10px; flex-wrap: wrap; }
.error { color: #ff9db5; margin: 0; }
</style>

