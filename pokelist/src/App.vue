<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface DefinicjaGeneracji {
  nazwa: string
  min: number
  max: number
}

interface PokemonApiResponse {
  id: number
  name: string
  sprites: {
    front_default: string | null
  }
  types: Array<{
    type: {
      name: string
    }
  }>
}

interface KartaPokemona {
  id: number
  nazwa: string
  obrazek: string
  typ: string
  generacja: string
  ilosc: number
}

type WynikDodawania = 'sukces' | 'poza-generacja' | 'nie-znaleziono' | 'blad'

const startowePokemony = [1, 1, 4, 7, 25, 25, 25, 39, 52, 133, 150, 152, 155, 155, 158, 252, 255, 258]
const domyslnyKolorTypu = '#a8a878'

const generacje: DefinicjaGeneracji[] = [
  { nazwa: 'Generacja I', min: 1, max: 151 },
  { nazwa: 'Generacja II', min: 152, max: 251 },
  { nazwa: 'Generacja III', min: 252, max: 386 },
  { nazwa: 'Generacja IV', min: 387, max: 493 },
  { nazwa: 'Generacja V', min: 494, max: 649 },
  { nazwa: 'Generacja VI', min: 650, max: 721 },
  { nazwa: 'Generacja VII', min: 722, max: 809 },
  { nazwa: 'Generacja VIII', min: 810, max: 905 },
  { nazwa: 'Generacja IX', min: 906, max: 1025 },
]

const koloryTypow: Record<string, string> = {
  normal: domyslnyKolorTypu,
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  grass: '#78c850',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  fairy: '#ee99ac',
}

const kolekcja = ref<KartaPokemona[]>([])
const komunikat = ref('')
const czyLadowanie = ref(false)

const sekcjeGeneracji = computed(() =>
  generacje.map((generacja) => ({
    ...generacja,
    pokemony: [...kolekcja.value]
      .filter((pokemon) => pokemon.generacja === generacja.nazwa)
      .sort((a, b) => a.id - b.id),
  })),
)

function znajdzGeneracje(id: number): string | null {
  for (const generacja of generacje) {
    if (id >= generacja.min && id <= generacja.max) {
      return generacja.nazwa
    }
  }

  return null
}

function pobierzKolorTypu(typ: string): string {
  return koloryTypow[typ] ?? domyslnyKolorTypu
}

function zliczPokemony(ids: number[]): Map<number, number> {
  const licznik = new Map<number, number>()

  for (const id of ids) {
    licznik.set(id, (licznik.get(id) ?? 0) + 1)
  }

  return licznik
}

async function dodajPokemonaPoId(pokemonId: number, ilosc = 1): Promise<WynikDodawania> {
  const generacja = znajdzGeneracje(pokemonId)

  if (generacja === null) {
    return 'poza-generacja'
  }

  const istniejacyPokemon = kolekcja.value.find((pokemon) => pokemon.id === pokemonId)

  if (istniejacyPokemon !== undefined) {
    istniejacyPokemon.ilosc += ilosc
    return 'sukces'
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

    if (response.status === 404) {
      return 'nie-znaleziono'
    }

    if (!response.ok) {
      return 'blad'
    }

    const dane = (await response.json()) as PokemonApiResponse
    const typ = dane.types[0]?.type.name ?? 'normal'

    kolekcja.value.push({
      id: dane.id,
      nazwa: dane.name,
      obrazek: dane.sprites.front_default ?? '',
      typ,
      generacja,
      ilosc,
    })

    return 'sukces'
  } catch {
    return 'blad'
  }
}

async function obsluzDodawaniePokemona(): Promise<void> {
  const wpisaneId = window.prompt('Podaj ID Pokemona:')

  komunikat.value = ''

  if (wpisaneId === null) {
    return
  }

  const pokemonId = Number(wpisaneId.trim())

  if (!Number.isInteger(pokemonId) || pokemonId < 1) {
    komunikat.value = 'Podaj poprawne ID Pokemona.'
    return
  }

  if (znajdzGeneracje(pokemonId) === null) {
    komunikat.value = 'Pokemon spoza obsługiwanych generacji.'
    return
  }

  czyLadowanie.value = true
  komunikat.value = 'Ładowanie...'

  const wynik = await dodajPokemonaPoId(pokemonId)

  czyLadowanie.value = false

  if (wynik === 'sukces') {
    komunikat.value = ''
    return
  }

  if (wynik === 'nie-znaleziono') {
    komunikat.value = 'Nie znaleziono Pokemona o podanym ID.'
    return
  }

  komunikat.value = 'Wystąpił błąd podczas pobierania danych.'
}

async function zaladujStartowePokemony(): Promise<void> {
  czyLadowanie.value = true
  komunikat.value = 'Ładowanie startowych Pokemonów...'

  const wpisyStartowe = [...zliczPokemony(startowePokemony).entries()]
  const wyniki = await Promise.all(
    wpisyStartowe.map(([pokemonId, ilosc]) => dodajPokemonaPoId(pokemonId, ilosc)),
  )

  czyLadowanie.value = false

  komunikat.value = wyniki.every((wynik) => wynik === 'sukces')
    ? ''
    : 'Wystąpił błąd podczas pobierania danych.'
}

onMounted(() => {
  void zaladujStartowePokemony()
})
</script>

<template>
  <div class="page-shell">
    <header class="page-header">
      <h1>Kolekcja Kart Pokemon</h1>
    </header>

    <main class="page-main">
      <section class="main-section">
        <h2>Dodawanie karty</h2>
        <p>Kliknij przycisk, aby dodać kartę Pokemona do kolekcji.</p>
        <button class="add-button" :disabled="czyLadowanie" @click="obsluzDodawaniePokemona">
          Dodaj Pokemona
        </button>
        <p class="komunikat" aria-live="polite">{{ komunikat }}</p>
      </section>

      <section class="main-section">
        <h2>Kolekcja użytkownika</h2>

        <div
          v-for="generacja in sekcjeGeneracji"
          :key="generacja.nazwa"
          class="generacja"
        >
          <h3>{{ generacja.nazwa }}</h3>

          <p v-if="generacja.pokemony.length === 0" class="brak-kart">
            Brak kart w tej generacji.
          </p>

          <div v-else class="karty">
            <article
              v-for="pokemon in generacja.pokemony"
              :key="pokemon.id"
              class="pokemon-card"
              :style="{ '--type-color': pobierzKolorTypu(pokemon.typ) }"
            >
              <div class="pokemon-name">{{ pokemon.nazwa }}</div>
              <div class="pokemon-id">ID: {{ pokemon.id }}</div>

              <div class="pokemon-image-wrapper">
                <img
                  v-if="pokemon.obrazek"
                  class="pokemon-img"
                  :src="pokemon.obrazek"
                  :alt="pokemon.nazwa"
                />
                <div v-else class="pokemon-placeholder">Brak obrazka</div>
              </div>

              <div class="pokemon-count">Ilość: {{ pokemon.ilosc }}</div>
              <div class="pokemon-type">{{ pokemon.typ }}</div>
            </article>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style>
:root {
  color-scheme: light;
  font-family: Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background-color: #eeeeee;
  color: #222222;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #eeeeee;
}

button,
input,
textarea,
select {
  font: inherit;
}

.page-shell {
  min-height: 100vh;
}

.page-header {
  background-color: #cc0000;
  color: #ffffff;
  text-align: center;
  padding: 24px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.page-header h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.4rem);
}

.page-main {
  width: min(1000px, calc(100% - 32px));
  margin: 24px auto 32px;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.main-section + .main-section {
  margin-top: 28px;
}

.main-section h2 {
  margin-top: 0;
  color: #cc0000;
  border-bottom: 2px solid #cc0000;
  padding-bottom: 6px;
}

.add-button {
  background-color: #ffcc00;
  border: 1px solid #999999;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.add-button:hover:not(:disabled) {
  background-color: #ffdd33;
  transform: translateY(-1px);
}

.add-button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.komunikat {
  min-height: 24px;
  margin-top: 12px;
  font-weight: bold;
  color: #cc0000;
}

.generacja {
  border: 1px solid #cccccc;
  margin-top: 20px;
  padding: 14px;
  border-radius: 10px;
  background: linear-gradient(180deg, #ffffff, #f8f8f8);
}

.generacja h3 {
  margin: 0 0 14px;
  background-color: #dddddd;
  padding: 8px 10px;
  border-radius: 8px;
}

.brak-kart {
  margin: 0;
}

.karty {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 180px));
  gap: 16px;
  justify-content: start;
}

.pokemon-card {
  --type-color: #a8a878;

  width: 180px;
  height: 250px;
  outline: 4px solid var(--type-color);
  border-radius: 18px;
  background-color: color-mix(in srgb, var(--type-color) 40%, #000);
  color: #ffffff;
  position: relative;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
}

.pokemon-name,
.pokemon-type {
  position: absolute;
  z-index: 1;
  background-color: var(--type-color);
  color: #ffffff;
  font-weight: bold;
  text-transform: capitalize;
  
  border-bottom-right-radius: 14px;
  border-top-left-radius: 14px;
}

.pokemon-name {
  top: -4px;
  left: -4px;
  max-width: 130px;
  padding: 8px 12px;
}

.pokemon-id {
  position: absolute;
  top: 42px;
  left: 12px;
  z-index: 1;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.92);
}

.pokemon-image-wrapper {
  position: absolute;
  inset: 66px 12px 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.pokemon-img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(0 10px 12px rgba(0, 0, 0, 0.35));
}

.pokemon-placeholder {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.28);
  padding: 10px 12px;
  border-radius: 10px;
}

.pokemon-count {
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.45);
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 14px;
}

.pokemon-type {
  right: -4px;
  bottom: -4px;
  padding: 8px 12px;
}

@media (max-width: 700px) {
  .page-main {
    width: min(100%, calc(100% - 16px));
    padding: 18px;
    margin: 16px auto 24px;
  }

  .karty {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .pokemon-card {
    justify-self: center;
  }
}
</style>
