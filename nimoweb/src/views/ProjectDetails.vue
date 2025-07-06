<template>
    Project Details: {{ projectId }}
</template>

<script>

export default {
    name: 'ProjectsDetails',
    props: {
        projectId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            projectId: this.$route.params.id
        };
    },
    mounted() {
        
    }
};

</script>