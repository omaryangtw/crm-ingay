<template>
  <div id="nav" class="relative">
    <Nav class="absolute top-0 w-full" />
    <router-view />
  </div>
</template>
<script>
import Nav from './components/Nav.vue';
export default {
  components: {
    Nav,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
