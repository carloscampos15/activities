<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon
      @click="$store.state.home.sidebar_status = !$store.state.home.sidebar_status"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Actividades.test</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: {},
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>

<style scoped>
</style>