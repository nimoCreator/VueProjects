<template>
    <div class="lilnavbar">
        <span class="navName">
            {{ navName }}
        </span>
        <div class="content">
            <a v-for="l in links" :key="l.name" :href="l.href" class="link">
                {{ l.name }}
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Lilnavbar',
    data() {
        return {
            links: [
                { name: 'Daily Channels',       href: '/lagoona-stats-posts/daily-channels' },
                { name: 'Daily Messages Sent',  href: '/lagoona-stats-posts/daily-messages-sent' },
                // { name: 'Daily Reactions',      href: '/lagoona-stats-posts/daily-reactions' },
                { name: "Daily VC",             href: '/lagoona-stats-posts/daily-vc' },
                { name: 'Weekly Channels',      href: '/lagoona-stats-posts/weekly-channels' },
                { name: 'Weekly Messages Sent', href: '/lagoona-stats-posts/weekly-messages-sent' },
                // { name: 'Weekly Reactions',     href: '/lagoona-stats-posts/weekly-reactions' },
                { name: 'Weekly VC',            href: '/lagoona-stats-posts/weekly-vc' }
            ],
            navName: '???',
        }
    },
    mounted() {
        this.navName = this.$route.name;
    }
}
</script>
<style scoped>

/* #region NAVBAR */

.lilnavbar {
    position: fixed;
    top: 1rem;
    left: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.lilnavbar .navName {
    color: #fff;
    font-size: 1.25rem;
}
.lilnavbar .content {
    display: none;
    flex-direction: column;
    gap: 0.5rem;
}
.lilnavbar:hover .content {
    display: flex;
}
.lilnavbar .link {
    color: #fff;
    text-decoration: none;
    padding: 0.25rem 0.5rem;

    border: 1px solid #fff;
    border-radius: 0.25rem;
}
.lilnavbar .link:hover {
    background-color: #fff;
    color: #000;
}
/* #endregion NAVBAR */

</style>
