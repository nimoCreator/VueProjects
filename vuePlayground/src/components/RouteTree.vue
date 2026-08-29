<template>
    <ul class="route-tree">
        <li v-for="node in nodes" :key="node.fullPath">
            <template v-if="node.children.length">
                <span class="folder-label">📁 {{ node.segment }}/</span>
                <router-link v-if="node.route" :to="node.route.path" class="folder-index-link">
                    ({{ node.route.name || 'index' }})
                </router-link>
                <RouteTree :nodes="node.children" />
            </template>
            <router-link v-else :to="node.route.path" class="route-link">
                📄 {{ node.route.name || node.segment }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "RouteTree",
    props: {
        nodes: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
.route-tree {
    list-style: none;
    padding-left: 1.25rem;
    margin: 0;
}

.folder-label {
    font-weight: 600;
    opacity: 0.85;
}

.folder-index-link {
    margin-left: 0.4rem;
    font-size: 0.85em;
    opacity: 0.7;
}

.route-link {
    display: inline-block;
    padding: 0.1rem 0;
}
</style>
