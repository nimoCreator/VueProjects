<template>
    <div class="adminNavbar">
        <router-link to="/admin/displayControls">Display Controls</router-link>
        <router-link to="/admin/teamsControls">Teams Controls</router-link>
        <router-link to="/admin/scoreControls">Score Controls</router-link>
        <router-link to="/admin/round1">Round 1</router-link>
        <router-link to="/admin/round2">Round 2</router-link>
        <router-link to="/admin/round3">Round 3</router-link>
        <router-link to="/admin/round4">Round 4</router-link>
    </div>
</template>

<style scoped>
.adminNavbar {
    display: flex;
    gap: 0.125rem;
    padding: 0.125rem;
}
.adminNavbar a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    border: 0.125rem white solid;
    padding: 0.5rem 1rem;
    border-radius: 0.125rem;
}
.adminNavbar a.router-link-exact-active {
    background-color: white;
    color: #333;
}
</style>