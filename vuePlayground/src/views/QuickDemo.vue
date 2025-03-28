<template>
    <p>{{ text }}</p>
    <br>
    <input v-model="text" />
</template>

<script>
export default {
    data() {
        return {
            text: 'Hello, World!'
        }
    }
}
</script>

<style>

</style>