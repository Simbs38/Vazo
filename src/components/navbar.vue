<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
</template>

<script>

import {defineComponent} from 'vue'

export default defineComponent({
  name: 'navbar'
})
</script>
