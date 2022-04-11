<template>
  <div id="headCanvas"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { startHeader } from '../src/header'

export default defineComponent({
    name: 'Home',
    mounted () {
        startHeader()
    }
})
</script>

<style>
  body{
    margin: 0%;
    overflow: hidden;
  }

  .headCanvas{
    position: absolute;
    margin: 0%;
    size: cover;
    width: 100%;
    height: 100%;
  }
</style>
