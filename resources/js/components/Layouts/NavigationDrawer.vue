<template>
  <v-navigation-drawer v-model="$store.state.home.sidebar_status" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{getUser.name}}</v-list-item-title>
        <v-list-item-subtitle v-if="getUser.rol">{{getUser.rol.name}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link to="/home">
        <v-list-item-action>
          <v-icon>mdi-home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/profile">
        <v-list-item-action>
          <v-icon>mdi-account</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Mi perfil</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn class="text-capitalize" color="primary" @click="logout" block outlined>Cerrar sesión</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { AUTH_LOGOUT } from "./../../store/actions/auth";
import { mapGetters } from "vuex";
export default {
  name: "NavigationDrawer",
  props: {},
  data: () => ({}),
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/"));
    },
  },
  computed: {
    ...mapGetters(["getUser"]),
  }
};
</script>

<style scoped>
</style>