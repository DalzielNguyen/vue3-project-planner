<template>
    <Navbar></Navbar>
  <router-view/>
</template>

<script lang="ts">
import Navbar from "@/components/Navbar.vue";
import { Vue, Options} from "vue-class-component";

@Options({
    components: {
        Navbar
    }
})

export default class App extends Vue {}
</script>

<style>
body {
    background: #f2f2f2;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 600px;
    margin: 0 auto;
  color: #555;
}
</style>
