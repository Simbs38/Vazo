<template>
  <navbar />
  <Form />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Form from '../components/Form.vue'
import navbar from '../components/navbar.vue'

export default defineComponent({
  name: 'Register',
  components: {
    Form, navbar
  }
})
</script>

<style scoped>

</style>
