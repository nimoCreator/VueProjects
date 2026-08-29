<template>
    <AdminNavbar />
    <div class="round2controls">
        <h2>Round 2 Controls</h2>
    </div>
    <ScoreControls />
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import ScoreControls from '@/components/admin/ScoreControls.vue';
export default {
    name: 'Round2AdminView',
    components: {
        AdminNavbar,
        ScoreControls,
    },
}
</script>