<template>
    <navbar />
    <router-view/>
</template>

<script>

import navbar from '@/Components/navbar.vue'

export default {
    name: 'Base',
    components: {
        navbar
    }
}
</script>

<style>

</style>
