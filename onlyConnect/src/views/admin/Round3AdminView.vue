<template>
    <AdminNavbar />
    <div class="round3controls">
        <h2>Round 3 Controls</h2>
    </div>
    <ScoreControls />
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import ScoreControls from '@/components/admin/ScoreControls.vue';
export default {
    name: 'Round3AdminView',
    components: {
        AdminNavbar,
        ScoreControls,
    },
}
</script>