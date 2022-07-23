<template>
  <v-container>
    <h3>Coquillage</h3>
    <HomeView/>
  </v-container>
</template>

<script>
import HomeView from "./views/HomeView.vue";
  

  export default {
    name: "App",
    components: { HomeView }
};
</script>