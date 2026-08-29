<template>
    <AdminNavbar />
    <div class="displayControls">
        <button @click="store.setRoundTo('teamsView')">Teams View</button>
        <button @click="store.setRoundTo('round1')">Round 1 View</button>
        <button @click="store.setRoundTo('round2')">Round 2 View</button>
        <button @click="store.setRoundTo('round3')">Round 3 View</button>
        <button @click="store.setRoundTo('round4')">Victory Screen</button>
    </div>
    <ScoreControls />
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import ScoreControls from '@/components/admin/ScoreControls.vue';
export default {
    name: 'ScoreControlsAdminView',
    components: {
        AdminNavbar,
        ScoreControls,
    },
}
</script>