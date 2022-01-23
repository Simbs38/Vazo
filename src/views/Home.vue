<template>
    <div id="headCanvas">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as client from '../assets/client'

export default defineComponent({
  name: 'Home',
  mounted () {
    client.getElement()
  }
})
</script>
