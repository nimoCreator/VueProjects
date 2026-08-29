<template>
    <div class="displayControls">
        <button @click="store.setRoundTo('preparationScreen')">Preparation Screen</button>
        <button @click="store.setRoundTo('intro')">Intro</button>
        <button @click="store.setRoundTo('teamsView')">Teams View</button>
        <button @click="store.setRoundTo('round1')">Round 1</button>
        <button @click="store.setRoundTo('round2')">Round 2</button>
        <button @click="store.setRoundTo('round3')">Round 3</button>
        <button @click="store.setRoundTo('round4')">Round 4</button>
        <button @click="store.setRoundTo('victory')">Victory Screen</button>
    </div>
</template>

<script>
import { useGameStore } from '@/js/stores/gameStore.js'

export default {
    name: 'DisplayControls',

    data() {
        return {
            store: useGameStore()
        }
    }
}
</script>


<style>
    
</style>