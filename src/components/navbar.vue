<template>
    <div id="menu" class="topnav">
      <router-link v-for="route in routeList" :key="route.path" :to="route.path">
        {{route.name}}
      </router-link>
  </div>
</template>

<script>

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'navbar',
    data: () => {
        return {
            routeList: []
        }
    },
    created () {
        this.routeList = this.$router.getRoutes()
    }
})
</script>

<style>
.topnav{
    background-color: transparent;
    overflow: hidden;
    padding-left: 10px;
    padding-top: 5px;
    position: absolute;
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

.topnav a.router-link-active {
    background-color: rgba(26, 26, 26, 0.25);
}
</style>
