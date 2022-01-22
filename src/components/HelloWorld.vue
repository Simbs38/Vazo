<template>
  <div id="headCanvas">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as client from '../assets/client'

export default defineComponent({
  name: 'HelloWorld',
  mounted () {
    client.getElement()
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.text{
    color: #121113 ;
    font-family: 'Advent Pro'
}

.text[id=headerText]{
    font-size: 80px;
    position:absolute;
    margin-top:20%;
    width:100%;
}

.container{
    padding: 30px;
}

.container[id=Intro]{
    background-color: #395371
}

.container[id=Defenition]{
    background-color: #2c3d52;
}

.container[id=Joke]{
    background-color: #1f2733;
    color: white;
}

.container[id=Rules]{
    background-color: #191c23;
    color: white;
}

.container[id=Footer]{
    background-color: #121113;
    color: white;
}
</style>
