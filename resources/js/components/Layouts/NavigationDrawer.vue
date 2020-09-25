<template>
  <v-navigation-drawer v-model="$store.state.home.sidebar_status" app>
    <v-list-item>
      <v-row>
        <v-col cols="12" sm="3" class="pt-4">
          <v-avatar size="42" color="primary">
            <span class="white--text headline custom-text">{{ getAvatar }}</span>
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="9" class="pt-1 pb-0 pl-1">
          <v-list-item-content>
            <v-list-item-title class="title"
              >{{ getUser.name }} {{ getUser.lastname }}</v-list-item-title
            >
            <v-list-item-subtitle v-if="getUser.rol">{{
              getUser.rol.name
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-col>
      </v-row>
    </v-list-item>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item link to="/activities">
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
        <v-btn
          class="text-capitalize"
          color="primary"
          @click="logout"
          block
          outlined
          >Cerrar sesión</v-btn
        >
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
  data: () => ({
    avatar: "",
  }),
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/"));
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
    getAvatar(){
      const name = this.getUser.name;
      const lastname = this.getUser.lastname;
      if(this.getUser.name !== undefined){
        return name.charAt(0) + lastname.charAt(0);
      }
    }
  }
};
</script>

<style scoped>
.custom-text{
      font-size: 1.0rem!important;
}
</style>