<template>
    <div class="topnav">
        <a class="active" href="/">Home</a>
        <a href="/Register"> Register </a>
        <a href="/Check"> Check </a>
        <a href="/Print"> Print </a>
        <a href="/About">About </a>
    </div>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'navbar'
})
</script>

<style>
.topnav{
  background-color: transparent;
  overflow: hidden;
  position: absolute;
  padding-left: 10px;
  padding-top: 5px;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 5%;
  margin: 2px;
  font-family: 'Lato', sans-serif;
}

.topnav a:hover {
  background-color: rgba(26, 26, 26, 0.125);
}

.topnav a.active {
  background-color: rgba(26, 26, 26, 0.25);
}
</style>
