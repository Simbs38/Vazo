<template>
    <navbar />
    <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navbar from './components/navbar.vue'

export default defineComponent({
    name: 'Base',
    components: {
        navbar
    }
})
</script>

<style>

</style>
