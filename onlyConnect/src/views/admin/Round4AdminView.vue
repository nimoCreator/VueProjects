<template>
    <AdminNavbar />
    <div class="round4controls">
        <h2>Round 4 Controls</h2>
    </div>
    <ScoreControls />
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import ScoreControls from '@/components/admin/ScoreControls.vue';
export default {
    name: 'Round4AdminView',
    components: {
        AdminNavbar,
        ScoreControls,
    },
}
</script>