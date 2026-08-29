<template>
    <AdminNavbar />
    <RoundControls />

    <div class="questions">
        <h1>QuestionsDB stats</h1>
        <div>Connections ( {{ store.usedTiles.connections.length }} ) {{ store.questionsDB.connections.length - store.usedTiles.connections.length }} / {{ store.questionsDB.connections.length }}</div>
        <div>Sequences ( {{ store.usedTiles.sequences.length }} ) {{ store.questionsDB.sequences.length - store.usedTiles.sequences.length }} / {{ store.questionsDB.sequences.length }}</div>

        <button @click="store.restartGame()">ResetGame</button>
    </div>

</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import RoundControls from '@/components/admin/DisplayControls.vue';
import { useGameStore } from '@/js/stores/gameStore.js';
export default {
    name: 'RoundControlsAdminView',
    components: {
        AdminNavbar,
        RoundControls,
    },
    data() {
        return {
            store: useGameStore(),
        }
    },
}
</script>