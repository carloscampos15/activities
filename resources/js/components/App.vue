<template>
  <v-app>
    <v-main>
      <router-view :rols="rols"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  props: ["rols"],
};
</script>

<style scoped>
</style>