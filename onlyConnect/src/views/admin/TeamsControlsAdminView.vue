<template>
    <AdminNavbar />
    <TeamControls />
</template>

<script>
import AdminNavbar from '@/components/admin/AdminNavbar.vue';
import TeamControls from '@/components/admin/TeamsControls.vue';
export default {
    name: 'TeamControlsAdminView',
    components: {
        AdminNavbar,
        TeamControls,
    },
}
</script>

<style>

</style>