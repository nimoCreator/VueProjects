<template>
  <section class="card">
    <div class="card-inner">
      <h1 class="title">Rejestracja</h1>
      <p class="muted">Stwórz konto i dostaniesz startowy bankroll tokenów.</p>

      <form class="form" @submit.prevent="onSubmit">
        <div class="field">
          <label>Handle</label>
          <input v-model.trim="handle" class="input" autocomplete="username" placeholder="np. player1" />
        </div>
        <div class="field">
          <label>Hasło</label>
          <input v-model="password" class="input" type="password" autocomplete="new-password" />
        </div>

        <div class="row">
          <button class="btn btn-primary" type="submit">
            <span class="material-symbols-rounded">person_add</span>
            <span>Załóż konto</span>
          </button>
          <RouterLink class="btn btn-ghost" to="/login">
            <span class="material-symbols-rounded">login</span>
            <span>Logowanie</span>
          </RouterLink>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useSessionStore } from '../stores/session.js'

const session = useSessionStore()
const router = useRouter()

const handle = ref('')
const password = ref('')
const error = ref('')

async function onSubmit() {
  error.value = ''
  try {
    await session.register(handle.value, password.value)
    await router.replace('/')
  } catch (e) {
    error.value = e?.message ?? 'Nie udało się zarejestrować.'
  }
}
</script>

<style scoped>
.title { margin: 0 0 6px; font-size: 26px; }
.form { margin-top: 14px; display: grid; gap: 12px; max-width: 520px; }
.row { display: flex; gap: 10px; flex-wrap: wrap; }
.error { color: #ff9db5; margin: 0; }
</style>

