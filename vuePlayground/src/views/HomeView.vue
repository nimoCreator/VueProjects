<template>
    <div>
        <h1>Available Routes</h1>
        <RouteTree :nodes="routeTree" />
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import RouteTree from "@/components/RouteTree.vue";

function buildRouteTree(routes) {
    const roots = [];

    for (const route of [...routes].sort((a, b) => a.path.localeCompare(b.path))) {
        if (route.path === "/") continue;

        const segments = route.path.split("/").filter(Boolean);
        let siblings = roots;
        let fullPath = "";

        segments.forEach((segment, index) => {
            fullPath += "/" + segment;
            let node = siblings.find((n) => n.segment === segment);
            if (!node) {
                node = { segment, fullPath, route: null, children: [] };
                siblings.push(node);
            }
            if (index === segments.length - 1) {
                node.route = route;
            }
            siblings = node.children;
        });
    }

    return roots;
}

export default {
    name: "HomeView",
    components: { RouteTree },
    setup() {
        const router = useRouter();
        const routeTree = buildRouteTree(router.getRoutes());

        return { routeTree };
    },
};
</script>
