<template>
  <div id="app">
    <main-page />
  </div>
</template>

<script lang="ts">
import MainPage from "@/views/MainPage.vue";
export default {
  components: {
    MainPage,
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  font-family: Roboto, sans-serif;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
